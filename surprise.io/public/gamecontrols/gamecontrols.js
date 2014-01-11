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
      when('/submitanswer', {
        templateUrl: 'partials/submitanswer.html',
        controller: 'GameControlsCtrl'
      }).
      when('/nextround', {
        templateUrl: 'partials/nextround.html',
        controller: 'GameControlsCtrl'
      }).
      otherwise({
        redirectTo: '/gamecontrols'
      });
  }]);


/* Controllers */

var quizControllers = angular.module('quizControllers', []);

var didBind = false;
quizControllers.controller('GameControlsCtrl', ['$scope', '$location', '$routeParams', 'socket', function ($scope, $location, $routeParams, socket) {

  var questionNr;
  $scope.startTileSelection = function(){
    socket.emit('request:startTileSelection', null);  
  }

  if(!didBind){
    didBind = true;
    socket.on('receive:setupTileSelection', function(data){
      $location.path('/starttileselection');
    });

    socket.on('receive:tileSelected', function(data){
      $location.path('/showquestion/' + data.questionNr);
    })

    socket.on('receive:enableSubmitAnswer', function(){
      $location.path('/submitanswer');
    });

    socket.on('receive:enableNextRound', function(data){
      $location.path('/nextround');      
    });
  }

  $scope.showQuestion = function(){
    var questionNr = $routeParams.questionNr;
    socket.emit('request:showQuestion', questionNr);
  }

  $scope.submitAnswer = function(){
    socket.emit('request:doSubmitAnswer');
  }

  $scope.goToNextRound = function(){
    socket.emit('request:goToNextRound');
  }
}]);