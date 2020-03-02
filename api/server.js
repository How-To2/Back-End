const express = require('express');
const helmet = require('helmet');
const cors = require("cors");

const server = express();

server.use(helmet());

server.use(cors());

server.get('/', (req, res) => {
    res.send(`api is up`)
})

module.exports = server;