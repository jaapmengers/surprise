'use strict';

var app = angular.module('quizApp', ['ngRoute', 'quizControllers']);

app.config(['$routeProvider', 
  function($routeProvider){
    $routeProvider.
      when('/gamecontrols', {
        templateUrl: 'partials/gamecontrols.html',
        controller: 'GameControlsCtrl'
      }).
      when('/startTileSelection', {
        templateUrl: 'partials/startselection.html',
        controller: 'GameControlsCtrl'
      }).
      otherwise({
        redirectTo: '/gamecontrols'
      });
  }]);


/* Controllers */

var quizControllers = angular.module('quizControllers', []);

quizControllers.controller('GameControlsCtrl', ['$scope', '$location', 'socket', function ($scope, $location, socket) {

  $scope.startTileSelection = function(){
    console.log("Start selectie");
    socket.emit('request:startTileSelection', null, function(s, args){
      //Error handling
    });  
  }

  socket.on('receive:setupTileSelection', function(data){
    $location.path('startTileSelection');
  });

}]);