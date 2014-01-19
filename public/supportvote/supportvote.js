'use strict';

/* Controllers */
var app = angular.module('quizApp', ['ngRoute', 'ngSanitize', 'quizControllers']);
app.config(['$routeProvider', 
  function($routeProvider){
    $routeProvider.
      when('/leeg', {
        templateUrl: 'partials/leeg.html',
        controller: 'SupportVoteCtrl'
      }).
      when('/question/:questionNr', {
        templateUrl: 'partials/question.html',
        controller: 'QuestionCtrl'
      }).
      otherwise({
        redirectTo: '/leeg'
      });
  }]);

var quizControllers = angular.module('quizControllers', []);
var didBind = false;

quizControllers.controller('SupportVoteCtrl', ['$scope', '$location', 'socket', function ($scope, $location, socket) {

  $scope.$on('$destroy', function (event) {
    socket.removeAllListeners();
  });

  socket.on('receive:showQuestion', function(data){
    console.log('receive:showQuestion', data);
    $location.path('/question/' + data);
    $scope.$$phase || $scope.$apply();
  });
  
}]);

quizControllers.controller('QuestionCtrl', ['$scope', '$location', '$routeParams', 'socket', function ($scope, $location, $routeParams, socket) {
  var nr = $routeParams.questionNr;
  var q = _.find(questions, function(it){
    return it.number == nr;
  });

  $scope.question = resetQuestion(q);

  $scope.getAnswerLetter = function(nr) {
    return getAnswerLetter(nr);
  };

  var roundEnded = function(){
    $location.path('/leeg');
    $scope.$$phase || $scope.$apply();
  }

  $scope.answerenabled = true;

  $scope.vote = function(answer){
    if($scope.answerenabled){
      socket.emit('request:doVote', answer.number);
      $scope.answerenabled = false;
      answer.selected = true;
      $scope.$$phase || $scope.$apply();
    }
  };

  socket.on('receive:roundEnded', roundEnded);

  $scope.$on('$destroy', function (event) {
    socket.removeAllListeners();
  });
}]);  

