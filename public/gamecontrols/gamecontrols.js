'use strict';

var app = angular.module('quizApp', ['ngRoute', 'ngSanitize', 'quizControllers']);

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
      when('/finishgame', {
        templateUrl: 'partials/finishgame.html',
        controller: 'FinishGameCtrl'
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

  socket.on('receive:tileSelected', function(data){
      console.log('receive:tileSelected', data);
      $location.path('/showquestion/' + data.questionNr);
      $scope.$$phase || $scope.$apply();
  });

  socket.on('receive:enableFinishGame', function(data){
    $location.path('/finishgame');
    $scope.$$phase || $scope.$apply();
  });

  socket.on('receive:enableSubmitAnswer', function(){
    console.log('receive:enableSubmitAnswer');
    $location.path('/submitanswer');
    $scope.$$phase || $scope.$apply();
  });

  $scope.$on('$destroy', function (event) {
    socket.removeAllListeners();
  });

}]);

quizControllers.controller('StartSelectionCtrl', ['$scope', '$location', '$routeParams', 'socket', function ($scope, $location, $routeParams, socket) {

  $scope.startTileSelection = function(){
    socket.emit('request:startTileSelection', null);  
    $location.path('/init');
    $scope.$$phase || $scope.$apply();
  }
}]);

quizControllers.controller('ShowQuestionCtrl', ['$scope', '$location', '$routeParams', 'socket', function ($scope, $location, $routeParams, socket) {

  $scope.showQuestion = function(){
    var questionNr = $routeParams.questionNr;
    socket.emit('request:showQuestion', questionNr);
    $location.path('/init');
    $scope.$$phase || $scope.$apply();
  }

  $scope.$on('$destroy', function (event) {
    socket.removeAllListeners();
  });

}]);

quizControllers.controller('SubmitAnswerCtrl', ['$scope', '$location', 'socket', function ($scope, $location, socket) {

  $scope.submitAnswer = function(){
    console.log('request:doSubmitAnswer');
    socket.emit('request:doSubmitAnswer');
  }

  socket.on('receive:enableNextRound', function(data){
    console.log('receive:enableNextRound');
    $location.path('/nextround');   
    $scope.$$phase || $scope.$apply();   
  });

  $scope.$on('$destroy', function (event) {
    socket.removeAllListeners();
  });

}]);

quizControllers.controller('NextRoundCtrl', ['$scope', '$location', 'socket', function ($scope, $location, socket) {

  $scope.goToNextRound = function(){
    socket.emit('request:goToNextRound');
    
    $location.path('/init');
    $scope.$$phase || $scope.$apply();
  }

  $scope.$on('$destroy', function (event) {
    socket.removeAllListeners();
  });
}]);

quizControllers.controller('FinishGameCtrl', ['$scope', '$location', 'socket', function ($scope, $location, socket) {

  $scope.finishGame = function(){
    socket.emit('request:finishGame');
    
    $location.path('/init');
    $scope.$$phase || $scope.$apply();
  }

  $scope.$on('$destroy', function (event) {
    socket.removeAllListeners();
  });
}]);