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
var currentTile = null;

io.sockets.on('connection', function (socket) {
  var emit = function(eventName, data){
  	socket.broadcast.emit(eventName, data);
  	socket.emit(eventName, data);
  }

  /* Dashboard */
  socket.on('request:getState', function(){
  	if(!currentTile){
  		socket.emit('receive:getState', 'noTileSelected')
  	}
  })

  socket.on('request:getTiles', function(){
  	console.log(tiles);
		emit('receive:getTiles', tiles);
  });
});