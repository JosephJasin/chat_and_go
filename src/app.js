const https = require('https');
const http = require('http');
const fs = require('fs');
const express = require('express');

const {Server: SocketIoServer} = require('socket.io');

const {httpsPort, httpPort} = require('config');
const handlers = require('./eventHandlers.js');

const app = express();

const options = {
    cert: fs.readFileSync(rootDir + '/cert/josephjasin_me.crt'),
    ca: fs.readFileSync(rootDir + '/cert/josephjasin_me.ca-bundle'),
    key: fs.readFileSync(rootDir + '/cert/server.key'),
}

const httpsServer = https.createServer(options, app);
const httpServer = http.createServer(app);

const io = new SocketIoServer(httpsServer);

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

app.enable('trust proxy');

app.use((req, res, next) => {
    req.secure ? next() :
        res.redirect('https://' + req.headers.host + req.url)
});


app.get('/*', (req, res) => {
    res.sendFile(rootDir + '/public/index.html');
})

io.on('connection', socket => {
    handlers.registerRoomHandler(io, socket)
    handlers.registerReconnectHandler(io, socket);
    handlers.registerMessageHandler(io, socket);
    handlers.registerMessagesHandler(io, socket);
});

httpsServer.listen(httpsPort);
httpServer.listen(httpPort);

