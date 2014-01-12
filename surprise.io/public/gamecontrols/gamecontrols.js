'use strict';

var app = angular.module('quizApp', ['ngRoute', 'quizControllers']);

app.config(['$routeProvider', 
  function($routeProvider){
    $routeProvider.
      when('/init', {
        templateUrl: 'partials/init.html',
        controller: 'InitCtrl'
      }).
      when('/gamecontrols', {
        templateUrl: 'partials/gamecontrols.html',
        controller: 'GameControlsCtrl'
      }).
      when('/starttileselection', {
        templateUrl: 'partials/startselection.html',
        controller: 'StartSelectionCtrl'
      }).
      when('/showquestion/:questionNr', {
        templateUrl: 'partials/showquestion.html',
        controller: 'ShowQuestionCtrl'
      }).
      when('/submitanswer', {
        templateUrl: 'partials/submitanswer.html',
        controller: 'SubmitAnswerCtrl'
      }).
      when('/nextround', {
        templateUrl: 'partials/nextround.html',
        controller: 'NextRoundCtrl'
      }).
      otherwise({
        redirectTo: '/init'
      });
  }]);


/* Controllers */

var didBind = false;
var quizControllers = angular.module('quizControllers', []);

quizControllers.controller('GameControlsCtrl', ['$scope', '$location', '$routeParams', 'socket', function ($scope, $location, $routeParams, socket) {

  var questionNr;
  $scope.startTileSelection = function(){
    socket.emit('request:startTileSelection', null);  
  }

  if(!didBind){
    socket.on('receive:setupTileSelection', function(data){
      console.log('receive:setupTileSelection', data);
      $location.path('/starttileselection');
    });

    socket.on('receive:tileSelected', function(data){
      console.log('receive:tileSelected', data.iets);
      $location.path('/showquestion/' + data.questionNr);
    })

    socket.on('receive:enableSubmitAnswer', function(){
      console.log('receive:enableSubmitAnswer');
      $location.path('/submitanswer');
    });

    socket.on('receive:enableNextRound', function(data){
      console.log('receive:enableNextRound');
      $location.path('/nextround');      
    });
    didBind = true;
  }
  $scope.showQuestion = function(){
    var questionNr = $routeParams.questionNr;
    console.log('request:showQuestion');
    socket.emit('request:showQuestion', questionNr);
  }

  $scope.submitAnswer = function(){
    console.log('request:doSubmitAnswer');
    socket.emit('request:doSubmitAnswer');
  }

  $scope.goToNextRound = function(){
    console.log('request:goToNextRound');
    socket.emit('request:goToNextRound');
  }

  $scope.init = function(){
    socket.emit('request:doInit');
  }
}]);