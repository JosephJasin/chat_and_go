const http = require('http');
const express = require('express');
const app = express();

const config = require('config');

if (process.env.NODE_ENV === 'development') {
    console.log('DEV');
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

app.get('/', (req, res) => {
    res.sendFile(rootDir + '/views/index.html');
})

const server = http.createServer(app);
server.listen(config.port);