const http = require('http');
const express = require('express');

const {Server: SocketIoServer} = require('socket.io');

const {port} = require('config');

const handlers = require('./eventHandlers.js');

const Room = require('../models/room.js');
const Member = require('../models/member.js');
const Message = require('../models/message.js');

const app = express();

const server = http.createServer(app);
const io = new SocketIoServer(server);

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

io.on('connection', socket => {
    handlers.registerRoomHandler(io, socket)
    handlers.registerReconnectHandler(io, socket);
    handlers.registerMessageHandler(io, socket);

});

server.listen(port);

