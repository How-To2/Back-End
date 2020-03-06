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



const authRouter = require('../auth/auth-router.js');
const howtoRouter = require('../howTo/howto-router');

const mvp2authenticate = require('../mvp2/mvp2-auth-middleware.js');
const mvp2Router = require('../mvp2/mvp2-router.js');
const mvp2Auth = require('../mvp2/mvp2-auth.js');


const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/auth', authRouter);
server.use('/api/howto', howtoRouter);

server.use('/api/mvp2/auth', mvp2Auth);
server.use('/api/mvp2/howto', mvp2authenticate, mvp2Router);

server.get("/", (req, res) => {res.send('this is an updated thing :p')});


module.exports = server;
