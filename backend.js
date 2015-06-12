var port = 8000;
var http = require('http');
var express = require('express');
var app = express();
var server = http.createServer(app).listen(port);
var io = require('socket.io').listen(server);

app.use(express.static(__dirname + '/www'));
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/www/index.html');
});

server.listen(port, function() {
    console.log("Listening on port " + port + "...");
});

io.on('connection', function(socket) {
    socket.on('message', function(message) {
        socket.broadcast.emit('message', message);
    });
 
    socket.on('disconnect', function() {
    socket.broadcast.emit('user disconnected');
    });
});
