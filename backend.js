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

    socket.on('enter', function(roomname) {
        socket.join(roomname);
    });

    socket.on('message', function(message) {
        emitMessage('message', message);
    });
 
    socket.on('disconnect', function() {
        console.log("socket closed :" + --connectionCount);
        emitMessage('user disconnected');
    });

    function emitMessage(type, message) {
        var roomname;
        if (socket.rooms.length > 1) {
            console.log("socket is in the rooms " + socket.rooms);
            roomname = socket.rooms[1];
        }

        if (roomname) {
            console.log("messgeing in the room, " + roomname);
            socket.broadcast.to(roomname).emit(type, message);
        } else {
            console.log("messgeing in public");
            socket.broadcast.emit(type, message);
        }
    }
});
