'use strict';

/* Controllers */


var questions = [new Question(1, 'Hoe oud ben ik?', [{answer:'18'}, {answer: '20'}, {answer: '26', correct: true}, {answer: '30'}])];
var questionsLeft = questions.map(function(q){
  return q.number;
});

function Question(number, question, answers){
  this.question = question;
  this.answers = answers;
  this.number = number;
}

var quizControllers = angular.module('quizControllers', []);

quizControllers.controller('SupportVoteCtrl', function ($scope, socket) {
  socket.on('name', function (data) {
    $scope.name = data.name;
  });
});


quizControllers.controller('BoardCtrl', ['$scope', '$location', 'socket', function ($scope, $location, socket) {

  $scope.tiles = new Array();
  socket.emit('getTiles', null, function(s, args){
    // Handle errors
  });

  $scope.setCurrentTile = function(tile){
    var q = questionsLeft.pop();
    socket.emit('gotoQuestion', {question: q, tile: tile.number}, function(s, args){
      //Do something on fail
    });
  }

  socket.on('gotoQuestion', function (data) {
    $location.path('/question/' + data.question + '/' + data.tile);
  });

  socket.on('send:tiles', function (data) {
    $scope.tiles = data;
  });
}]);

quizControllers.controller('QuestionCtrl', ['$scope', '$routeParams', '$location', 'socket', function($scope, $routeParams, $location, socket){
  var id = $routeParams.questionId;
  var tileId = $routeParams.tileId;
  if(id){
    $scope.question = _.find(questions, function(it){
      return it.number == id;
    });
  }

  $scope.doAnswer = function(answer){
    if(answer.correct){
      console.log("Setting correct", tileId);
      socket.emit('setCorrect', tileId, function(){
        //Handle errors
      });
      $location.path('/board');
    }
  }
}]);

quizControllers.controller('ControllerCtrl', function ($scope, socket) {
  socket.on('name', function (data) {
    $scope.name = data.name;
  });
});