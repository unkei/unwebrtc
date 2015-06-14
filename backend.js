var port = process.env.PORT || 8000;
var http = require('http');
var express = require('express');
var app = express();
var WebSocketServer = require('ws').Server;

app.use(express.static(__dirname + '/www'));
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/www/index.html');
});

var server = http.createServer(app);
server.listen(port, function() {
    console.log("Listening on port " + port + "...");
});

var wss = new WebSocketServer({server: server});
var connections = [];

wss.on('connection', function(socket) {
    connections.push(socket);
    console.log("new socket connected :" + connections.length);
    socket.on('close', function () {
        connections = connections.filter(function (conn, i) {
            return (conn === socket) ? false : true;
        });
        console.log("socket closed :" + connections.length);
    });

    socket.on('message', function(message) {
        broadcast(socket, message);
    });
 
    socket.on('disconnect', function() {
        broadcast(socket, '{"type": "user disconnected"}');
    });
});

function broadcast(ws, msg) {
    console.log("broadcast(" + msg + ")");
    connections.forEach(function (con, i) {
        if (ws !== con) {
            con.send(msg);
        }
    });
}
