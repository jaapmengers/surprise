'use strict';

/* Controllers */
var app = angular.module('quizApp', ['ngRoute', 'ngSanitize', 'quizControllers']);
app.config(['$routeProvider', 
  function($routeProvider){
    $routeProvider.
      when('/board/:newRound?', {
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
      when('/finishgame', {
        templateUrl: 'partials/finishgame.html',
        controller: 'FinishGameCtrl'
      }).
      otherwise({
        redirectTo: '/board/true'
      });
  }]);


var saveQuestionStateInLocalStorage = function(qs){
  localStorage["questions"] = JSON.stringify(qs);
};

var loadInitialOrGetFromStorage = function(){
  if(!localStorage["questions"]){
    console.log("No localStorage state available. Initializing");
    console.log(questions);
    saveQuestionStateInLocalStorage(questions);
  } else {
    console.log("Loading from localStorage");
  }
  return JSON.parse(localStorage["questions"]);
};

var currentQuestion = null;
var currentTile = null;
var didBind = false;
var boardQuestions = loadInitialOrGetFromStorage();

var quizControllers = angular.module('quizControllers', []);

quizControllers.controller('BoardCtrl', ['$scope', '$routeParams', '$location', 'socket', function ($scope, $routeParams, $location, socket) {
  
  var interval;
  var tileNr;

  $scope.tiles = new Array();

  /* Helper function to emit */
  var emit = function(eventName, data){
    socket.emit(eventName, data);  
  }

  var init = function(){
    emit('request:getTiles');
  }

  if($routeParams.newRound){
    init();
  }

  var setTiles = function(tiles) {
    $scope.tiles = tiles;
    $scope.$apply();
    var activeTiles = getActiveTiles();
    if(activeTiles.length == 0){
      emit('request:enableFinishGame');
    } else {
      emit('request:setupTileSelection', Math.random());
    }
  }

  var startTileSelection = function(){
    
    console.log('receive:startTileSelection');

    var activeTiles = getActiveTiles();
    var activeTileNumbers = getActiveTileNumbers(activeTiles);

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
        $scope.$apply();
      } else {
        console.log("Help, dit gaat fout!");
      }
    }, 200);
  };

  var selectTile = function(){

    clearInterval(interval);
    currentTile = _.find($scope.tiles, function(it){
      return it.active;
    });
    
    currentQuestion = boardQuestions.pop();
    saveQuestionStateInLocalStorage(boardQuestions);

    emit('request:tileSelected', {questionNr: currentQuestion.number});
  };

  $scope.getLocation = function(tile, offset){
    var row = Math.floor(tile.number / 4);
    var col = tile.number % 4;
    return 'background-position: top -' + row * offset + 'px left -' + col * offset +'px';
  }

  var getActiveTiles = function(){
    return $scope.tiles.filter(function(it){
      return !it.opened;
    });
  };

  var getActiveTileNumbers = function(tiles){
    return tiles.map(function(it){
      return it.number;
    });
  };

  var showQuestion = function(){
    $location.path('/question')
    $scope.$$phase || $scope.$apply();
  };

  var finishGame = function(){
    $location.path('/finishgame')
    $scope.$$phase || $scope.$apply();
  }

  $scope.$on('$destroy', function (event) {
    socket.removeAllListeners();
  });

  console.log('Binding board');
  socket.on('receive:getTiles', setTiles);
  socket.on('receive:startTileSelection', startTileSelection);
  socket.on('receive:selectTile', selectTile);
  socket.on('receive:showQuestion', showQuestion);
  socket.on('receive:doInit', init);
  socket.on('receive:finishGame', finishGame);

}]);

quizControllers.controller('QuestionCtrl', ['$scope', '$location', '$routeParams', 'socket', function ($scope, $location, $routeParams, socket) {

  $scope.question = resetQuestion(currentQuestion);

  var selectedAnswer = null;

  var goToNextRound = function(){
    console.log('receive:goToNextRound');
    $location.path('/board/true');
    $scope.$$phase || $scope.$apply();
  };

  $scope.calculatePercentage = function(number, total){
    if(!number || !total)
      return 0;

    return Math.round((number / total) * 100);
  }

  $scope.getAnswerLetter = function(nr) {
    return getAnswerLetter(nr);
  }; 
    
  socket.on('receive:doAnswer', function(data){
    console.log('receive:doAnswer');
    var answer = _.find($scope.question.answers, function(it){
      return it.number == data;
    });
    if(answer){
      answer.selected = true;
      selectedAnswer = answer;
      $scope.$$phase || $scope.$apply()
      enableSubmitAnswer();
    }
  });

  socket.on('receive:votesUpdated', function(data){
    $scope.votes = data;
    $scope.totalVotes = _.reduce(data, function(memo, num) { return memo + num}, 0);
    console.log(data, $scope.totalVotes);
    $scope.$$phase || $scope.$apply();
  });

  socket.on('receive:doSubmitAnswer', function(data){
    socket.emit('request:possiblyOpenTileAndEnableNextRound', {number: currentTile.number, correct: selectedAnswer.correct});
    if(selectedAnswer.correct){
      $location.path('/correct');
    } else {

      console.log(boardQuestions);

      console.log(boardQuestions.map(function(it){return it.question;}));

      boardQuestions.unshift($scope.question);
      saveQuestionStateInLocalStorage(boardQuestions);

      console.log(boardQuestions.map(function(it){return it.question;}));

      $location.path('/wrong');
    }
    $scope.$$phase || $scope.$apply();
  });

  socket.on('receive:goToNextRound', goToNextRound);

  $scope.$on('$destroy', function (event) {
    socket.removeAllListeners();
  });

  var enableSubmitAnswer = function(){
    socket.emit('request:enableSubmitAnswer');
  }
}]);

quizControllers.controller('FinishGameCtrl', ['$scope', function ($scope) {

}]);
