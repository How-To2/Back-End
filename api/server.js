const express = require('express');
const cors = require('cors');
const helmet = require('helmet');


const bcrypt = require("bcryptjs");
const router = require("express").Router();


const restricted = require("../auth/authenticate-middleware");



router.get("/hash", (req, res) => {

    const authentication = req.headers.authentication;
  
    const hash = bcrypt.hashSync(authentication, 12);
  
    res.json({ originalValue: authentication, hashedValue: hash });
  
});


const authenticate = require('../auth/authenticate-middleware.js');
const authRouter = require('../auth/auth-router.js');
const howtoRouter = require('../howTo/howto-router');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/auth', authRouter);
server.use('/api/howto', howtoRouter);


server.get("/", (req, res) => {res.send('this is a thing :p')});


module.exports = server;
