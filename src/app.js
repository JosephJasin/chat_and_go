const http = require('http');
const express = require('express');

const {port} = require('config');

const Room = require('../models/room.js');
const Member = require('../models/member.js');
const Message = require('../models/message.js');


const app = express();

if (process.env.NODE_ENV === 'development') {
    const livereload = require("livereload");
    const connectLiveReload = require("connect-livereload");

    const liveReloadServer = livereload.createServer();
    liveReloadServer.server.once("connection", () => {
        setTimeout(() => {
            liveReloadServer.refresh("/");
        }, 100);
    });

    app.use(connectLiveReload());
}

app.use(express.static('public'));

app.get('/', async (req, res) => {
    res.sendFile(rootDir + '/views/index.html');
})

const server = http.createServer(app);
server.listen(port);

