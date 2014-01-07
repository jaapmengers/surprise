var express = require('express'),
  http = require('http'),
  path = require('path'),
  us = require('underscore');

var app = module.exports = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);

app.use(express.static(path.join(__dirname, 'public')));

server.listen(3000);

var setupTiles = function(){
	var tiles = new Array();
	for(var i =0; i < 12; i++){
		tiles.push({number: i, opened: false});
	}
	return tiles;
}
var tiles = setupTiles();

io.sockets.on('connection', function (socket) {
  var emit = function(eventName, data){
  	socket.broadcast.emit(eventName, data);
  	socket.emit(eventName, data);
  }

  socket.on('gotoQuestion', function (data) {
    emit('gotoQuestion', data);
  });

  socket.on('setCorrect', function(data){
  	var item = us.find(tiles, function(it){
  		return it.number == data
  	});
  	if(item){
  		item.opened = true;
  	}
  });

  socket.on('getTiles', function(){
  	console.log(tiles);
		emit('send:tiles', tiles);
  });
});