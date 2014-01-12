'use strict';

var app = angular.module('quizApp', ['ngRoute', 'quizControllers']);

app.config(['$routeProvider', 
  function($routeProvider){
    $routeProvider.
      when('/init', {
        templateUrl: 'partials/init.html',
        controller: 'InitCtrl'
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



var quizControllers = angular.module('quizControllers', []);

quizControllers.controller('InitCtrl', ['$scope', '$location', '$routeParams', 'socket', function ($scope, $location, $routeParams, socket) {

  $scope.init = function(){
    socket.emit('request:doInit');
  }

  socket.on('receive:setupTileSelection', function(data){
    console.log('Start tile selection');
    $location.path('/starttileselection');
    $scope.$$phase || $scope.$apply();
  });

}]);

quizControllers.controller('StartSelectionCtrl', ['$scope', '$location', '$routeParams', 'socket', function ($scope, $location, $routeParams, socket) {

  $scope.startTileSelection = function(){
    socket.emit('request:startTileSelection', null);  
  }

  socket.on('receive:tileSelected', function(data){
      console.log('receive:tileSelected', data.iets);
      $location.path('/showquestion/' + data.questionNr);
      $scope.$$phase || $scope.$apply();
  });
}]);

quizControllers.controller('ShowQuestionCtrl', ['$scope', '$location', '$routeParams', 'socket', function ($scope, $location, $routeParams, socket) {

  $scope.showQuestion = function(){
    var questionNr = $routeParams.questionNr;
    console.log('request:showQuestion');
    socket.emit('request:showQuestion', questionNr);
  }

  socket.on('receive:enableSubmitAnswer', function(){
    console.log('receive:enableSubmitAnswer');
    $location.path('/submitanswer');
    $scope.$$phase || $scope.$apply();
  });

}]);

quizControllers.controller('SubmitAnswerCtrl', ['$scope', '$location', '$routeParams', 'socket', function ($scope, $location, $routeParams, socket) {

  $scope.submitAnswer = function(){
    console.log('request:doSubmitAnswer');
    socket.emit('request:doSubmitAnswer');
  }

  socket.on('receive:enableNextRound', function(data){
    console.log('receive:enableNextRound');
    $location.path('/nextround');   
    $scope.$$phase || $scope.$apply();   
  });

}]);

quizControllers.controller('NextRoundCtrl', ['$scope', '$location', '$routeParams', 'socket', function ($scope, $location, $routeParams, socket) {

  $scope.goToNextRound = function(){
    console.log('request:goToNextRound');
    socket.emit('request:goToNextRound');
  }
}]);