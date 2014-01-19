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
    socket.emit('request:selectTile', null);
    $location.path('/leeg');
    $scope.$$phase || $scope.$apply();
  };

  $scope.$on('$destroy', function (event) {
    socket.removeAllListeners();
  });

  socket.on('receive:startTileSelection', function(data){
    console.log('receive:startTileSelection');
    $location.path('/tileselection');
    $scope.$$phase || $scope.$apply();
  });

  socket.on('receive:showQuestion', function(data){
    console.log('receive:showQuestion', data);
    $location.path('/question/' + data);
    $scope.$$phase || $scope.$apply();
  });
  
}]);

quizControllers.controller('QuizCtrl', ['$scope', '$location', '$routeParams', 'socket', function ($scope, $location, $routeParams, socket) {
  var nr = $routeParams.questionNr;
  $scope.question = _.find(questions, function(it){
    return it.number == nr;
  });

  $scope.answerenabled = true;

  $scope.doAnswer = function(answer){
    if($scope.answerenabled){
      socket.emit('request:doAnswer', answer.number);
      answer.selected = true;
      $scope.answerenabled = false;
      $scope.$$phase || $scope.$apply();
    }
  }

  $scope.$on('$destroy', function (event) {
    socket.removeAllListeners();
  });

  var goToNextRound = function(){
    $location.path('/leeg');
    $scope.$$phase || $scope.$apply();
  };

  socket.on('receive:roundEnded', goToNextRound);
}]);  

