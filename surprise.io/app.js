/* Initialization */
var express = require('express'),
  http = require('http'),
  path = require('path'),
  us = require('underscore');

var app = module.exports = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);

app.use(express.static(path.join(__dirname, 'public')));

/* Listen */
server.listen(3000);

/* Create the initial board */
var setupTiles = function(){
	var tiles = new Array();
	for(var i =0; i < 12; i++){
		tiles.push({number: i, opened: false, active: false});
	}
	return tiles;
}
var tiles = setupTiles();

/*Listen */
io.sockets.on('connection', function (socket) {
  var emit = function(eventName, data){
  	socket.broadcast.emit(eventName, data);
  	socket.emit(eventName, data);
  }

  socket.on('request:startTileSelection', function(){
    emit('receive:startTileSelection', null);
  });

  socket.on('request:setupTileSelection', function(){
    emit('receive:setupTileSelection', null);
  });

  socket.on('request:getTiles', function(){
		emit('receive:getTiles', tiles);
  });

  socket.on('request:selectTile', function(){
    emit('receive:selectTile', tiles);
  });

  socket.on('request:openTile', function(data){
    //doStuff
  });

  socket.on('request:tileSelected', function(data){
    emit('receive:tileSelected', data);
  });

  socket.on('request:showQuestion', function(data){
    emit('receive:showQuestion', data);
  });

  socket.on('request:doAnswer', function(data){
    emit('receive:doAnswer', data);
  });
});