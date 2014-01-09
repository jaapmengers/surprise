'use strict';

/* Controllers */
var app = angular.module('quizApp', ['ngRoute', 'quizControllers']);
app.config(['$routeProvider', 
  function($routeProvider){
    $routeProvider.
      when('/leeg', {
        templateUrl: 'partials/leeg.html',
        controller: 'PlayerControlsCtrl'
      }).
      when('/tileselection', {
        templateUrl: 'partials/tileselection.html',
        controller: 'PlayerControlsCtrl'
      }).
      otherwise({
        redirectTo: '/leeg'
      });
  }]);

var quizControllers = angular.module('quizControllers', []);

var currentQuestion = null;
var startedTileSelection = false;

/* First, does some routing if necessary. Sets up selection of tile and gets a question  */
quizControllers.controller('PlayerControlsCtrl', ['$scope', '$location', 'socket', function ($scope, $location, socket) {

  $scope.onClick = function(){
    socket.emit('request:selectTile', null, function(s, args){
      //Error handling
    });  
  }

  socket.on('receive:startTileSelection', function(data){
    $location.path('/tileselection');
  });
}]);