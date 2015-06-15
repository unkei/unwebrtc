var port = process.env.PORT || 8000;
var http = require('http');
var express = require('express');
var app = express();
var server = http.createServer(app).listen(port);
var io = require('socket.io').listen(server);
var connectionCount = 0;

app.use(express.static(__dirname + '/www'));
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/www/index.html');
});

server.listen(port, function() {
    console.log("Listening on port " + port + "...");
});

io.on('connection', function(socket) {
    console.log("new socket connected :" + ++connectionCount);

    socket.on('message', function(message) {
        socket.broadcast.emit('message', message);
    });
 
    socket.on('disconnect', function() {
        console.log("socket closed :" + --connectionCount);
        socket.broadcast.emit('user disconnected');
    });
});
