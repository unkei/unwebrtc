var port = 9001;
var io = require('socket.io').listen(port);
console.log((new Date()) + " Server is listening on port " + port);
 
io.sockets.on('connection', function(socket) {
  socket.on('message', function(message) {
    socket.broadcast.emit('message', message);
  });
 
  socket.on('disconnect', function() {
    socket.broadcast.emit('user disconnected');
  });
});
