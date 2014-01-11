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
      when('/question/:questionNr', {
        templateUrl: 'partials/question.html',
        controller: 'QuizCtrl'
      }).
      otherwise({
        redirectTo: '/leeg'
      });
  }]);

var quizControllers = angular.module('quizControllers', []);

var didBind = false;
quizControllers.controller('PlayerControlsCtrl', ['$scope', '$location', 'socket', function ($scope, $location, socket) {

  $scope.onClick = function(){
    socket.emit('request:selectTile', null, function(s, args){
      //Error handling
    });  
  }

  if(!didBind){
    didBind = true;
    socket.on('receive:startTileSelection', function(data){
      $location.path('/tileselection');
    });

    socket.on('receive:showQuestion', function(data){
      $location.path('/question/' + data);
    });
  }
}]);

quizControllers.controller('QuizCtrl', ['$scope', '$location', '$routeParams', 'socket', function ($scope, $location, $routeParams, socket) {
  var nr = $routeParams.questionNr;
  $scope.question = _.find(questions, function(it){
    return it.number == nr;
  });

  $scope.doAnswer = function(answer){
    socket.emit('request:doAnswer', answer.number);
  }
}]);  

