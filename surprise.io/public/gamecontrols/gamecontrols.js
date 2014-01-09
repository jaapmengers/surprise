'use strict';

var app = angular.module('quizApp', ['ngRoute', 'quizControllers']);

app.config(['$routeProvider', 
  function($routeProvider){
    $routeProvider.
      when('/gamecontrols', {
        templateUrl: 'partials/gamecontrols.html',
        controller: 'GameControlsCtrl'
      }).
      when('/starttileselection', {
        templateUrl: 'partials/startselection.html',
        controller: 'GameControlsCtrl'
      }).
      when('/showquestion/:questionNr', {
        templateUrl: 'partials/showquestion.html',
        controller: 'GameControlsCtrl'
      }).
      otherwise({
        redirectTo: '/gamecontrols'
      });
  }]);


/* Controllers */

var quizControllers = angular.module('quizControllers', []);

quizControllers.controller('GameControlsCtrl', ['$scope', '$location', '$routeParams', 'socket', function ($scope, $location, $routeParams, socket) {

  var questionNr;
  $scope.startTileSelection = function(){
    socket.emit('request:startTileSelection', null);  
  }

  socket.on('receive:setupTileSelection', function(data){
    $location.path('/starttileselection');
  });

  socket.on('receive:tileSelected', function(data){
    $location.path('/showquestion/' + data.questionNr);
  })

  $scope.showQuestion = function(){
    var questionNr = $routeParams.questionNr;
    socket.emit('request:showQuestion', questionNr);
  }

}]);