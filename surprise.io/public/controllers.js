'use strict';

/* Controllers */

var quizControllers = angular.module('quizControllers', []);

quizControllers.controller('BoardCtrl', ['$scope', '$location', 'socket', function ($scope, $location, socket) {

  var emit = function(eventName){
    socket.emit(eventName, null, function(s, args){
      //Error handling
    });  
  }

  emit('getState');

  socket.on('receive:getState', function(data){
    
  })

  $scope.tiles = new Array();
  socket.emit('request:getTiles', null, function(s, args){
    // Handle errors
  });

  socket.on('receive:getTiles', function (data) {
    $scope.tiles = data;
  });
}]);