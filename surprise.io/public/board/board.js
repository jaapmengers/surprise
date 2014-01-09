'use strict';

/* Controllers */
var app = angular.module('quizApp', ['ngRoute', 'quizControllers']);
app.config(['$routeProvider', 
  function($routeProvider){
    $routeProvider.
      when('/board', {
        templateUrl: 'partials/board.html',
        controller: 'BoardCtrl'
      }).
      when('/question', {
        templateUrl: 'partials/question.html',
        controller: 'QuestionCtrl'
      }).
      when('/correct', {
        templateUrl: 'partials/correct.html',
        controller: 'QuestionCtrl'
      }).
      when('/wrong', {
        templateUrl: 'partials/wrong.html',
        controller: 'QuestionCtrl'
      }).
      otherwise({
        redirectTo: '/board'
      });
  }]);

var quizControllers = angular.module('quizControllers', []);

var currentQuestion = null;
var currentTile = null;

/* First, does some routing if necessary. Sets up selection of tile and gets a question  */
quizControllers.controller('BoardCtrl', ['$scope', '$location', 'socket', function ($scope, $location, socket) {
  
  /* Helper function to emit */
  var emit = function(eventName){
    socket.emit(eventName, null, function(s, args){
      //Error handling
    });  
  }

  /* Setup tiles */
  $scope.tiles = new Array();

  emit('request:getTiles');
  socket.on('receive:getTiles', function (data) {
    $scope.tiles = data;
  });

  if(!currentQuestion && !currentTile){
    emit('request:setupTileSelection');
  }

  var interval;
  var tileNr;

  socket.on('receive:startTileSelection', function(data){
    var activeTiles = $scope.tiles.filter(function(it){
      return !it.opened;
    })

    var activeTileNumbers = activeTiles.map(function(it){
      return it.number;
    });

    var shuffled = _.shuffle(activeTileNumbers);
    var previousItem = null; 
    interval = setInterval(function(it){

      var curNr = shuffled.pop();
      shuffled.unshift(curNr);

      if(previousItem){
        previousItem.active = false;
      }
      var currentItem = _.find(activeTiles, function(it){
        return it.number == curNr;
      });
      if(currentItem){
        currentItem.active = true;
        previousItem = currentItem;
        console.log("$scope.apply van die andere plek");
        $scope.$apply();
      }
    }, 200);
    
  });

  socket.on('receive:selectTile', function(){
    clearInterval(interval);
    currentTile = _.find($scope.tiles, function(it){
      return it.active;
    });

    currentQuestion = questions.pop();
    socket.emit('request:tileSelected', {questionNr: currentQuestion.number});
  });

  socket.on('receive:showQuestion', function(){
    $location.path('/question')
  });
}]);

quizControllers.controller('QuestionCtrl', ['$scope', '$location', 'socket', function ($scope, $location, socket) {

  $scope.question = currentQuestion;

  socket.on('receive:doAnswer', function(data){
    var answer = _.find($scope.question.answers, function(it){
      return it.number == data;
    });
    if(answer){
      answer.selected = true;
      console.log(answer);
      //Hier gebleven. Geselecteerde antwoord selecteren.
      console.log($scope.$$phase);
      if(!$scope.$$phase){
        console.log("scope apply vanaf de nieuwe plek");
        $scope.$apply();
      }
      //$scope.$apply();
    }
  });

}]);