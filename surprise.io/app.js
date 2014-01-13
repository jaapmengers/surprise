/* Initialization */
var express = require('express'),
  http = require('http'),
  path = require('path'),
  us = require('underscore');

var app = module.exports = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server, {log: false});

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

var initVotes = function(){
  return {1: 0, 2: 0, 3: 0, 4: 0};
}

var votes = initVotes();

/*Listen */
io.sockets.on('connection', function (socket) {

  console.log('on connect', socket.id);
  socket.on('disconnect', function(){
    console.log('on disconnect', socket.id);
  });

  var emit = function(eventName, data){
    console.log(eventName);
  	io.sockets.emit(eventName, data);
  };

  socket.on('request:startTileSelection', function(){
    emit('receive:startTileSelection', null);
  });

  socket.on('request:setupTileSelection', function(data){
    console.log('request:setupTileSelection', data);
    emit('receive:setupTileSelection', data);
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
    console.log('tileSelected');
    emit('receive:tileSelected', data);
  });

  socket.on('request:showQuestion', function(data){
    emit('receive:showQuestion', data);
  });

  socket.on('request:doAnswer', function(data){
    emit('receive:doAnswer', data);
  });

  socket.on('request:enableSubmitAnswer', function(data){
    emit('receive:enableSubmitAnswer', data);
  });

  socket.on('request:doSubmitAnswer', function(data){
    emit('receive:doSubmitAnswer', data);
    emit('receive:roundEnded', null);
    votes = initVotes();
  });

  socket.on('request:doVote', function(data){
    votes[data]++;
    emit('receive:votesUpdated', votes);
  });

  socket.on('request:possiblyOpenTileAndEnableNextRound', function(data){
    if(data.correct){
      var tile = us.find(tiles, function(ti){
        return ti.number == data.number;
      });
      tile.opened = true;
    }

    emit('receive:enableNextRound');
  });

  socket.on('request:goToNextRound', function(data){
    emit('receive:goToNextRound');
  });

  socket.on('request:doInit', function(){
    emit('receive:doInit');
  });
});