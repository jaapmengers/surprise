var express = require('express'),
  http = require('http'),
  path = require('path');

var app = module.exports = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);

app.use(express.static(path.join(__dirname, 'public')));

server.listen(3000);

io.sockets.on('connection', function (socket) {
  socket.emit('name', { name: 'Jaap' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});