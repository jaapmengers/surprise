'use strict';

/* Controllers */
var app = angular.module('quizApp', ['ngRoute', 'quizControllers']);
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
      otherwise({
        redirectTo: '/board/true'
      });
  }]);

var currentQuestion = null;
var currentTile = null;
var didBind = false;

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
    emit('request:setupTileSelection', Math.random());
  }

  if($routeParams.newRound){
    init();
  }

  var setTiles = function(tiles) {
    $scope.tiles = tiles;
    $scope.$apply();
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
      }
    }, 200);
  };

  var selectTile = function(){

    clearInterval(interval);
    currentTile = _.find($scope.tiles, function(it){
      return it.active;
    });

    currentQuestion = questions.pop();
    console.log(currentQuestion);
    emit('request:tileSelected', {questionNr: currentQuestion.number});
  };

  $scope.getLocation = function(tile, offset){
    var row = Math.floor(tile.number / 4);
    /* tiles are not numbered zero based, so minus one for calculations */
    var col = tile.number % 4;
    console.log({row: row, col: col, tile: tile.number});
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
    console.log('receive:showQuestion');
    $location.path('/question')
    $scope.$$phase || $scope.$apply();
  };

  $scope.$on('$destroy', function (event) {
    socket.removeAllListeners();
  });

  console.log('Binding board');
  socket.on('receive:getTiles', setTiles);
  socket.on('receive:startTileSelection', startTileSelection);
  socket.on('receive:selectTile', selectTile);
  socket.on('receive:showQuestion', showQuestion);
  socket.on('receive:doInit', init);

  /* Hier gebleven. Volgende stap is overwegen of het blok 'setup tiles' 
   * beter op basis van een event vanuit de GameControls kan verlopen.
   * Vervolgens:
   * - Supportvote spullen bouwen
   * - De lijst van vragen en de status daarvan persisten in local storage
   * - Stylen
   * - Vragen verzinnen
   */

}]);

quizControllers.controller('QuestionCtrl', ['$scope', '$location', 'socket', function ($scope, $location, socket) {

  $scope.question = currentQuestion;
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
      $location.path('/wrong');
    }
    $scope.$$phase || $scope.$apply();
  });

  socket.on('receive:goToNextRound', goToNextRound);

  $scope.$on('$destroy', function (event) {
    socket.removeAllListeners();
  });

  var enableSubmitAnswer = function(){
    console.log('request:enableSubmitAnswer');
    socket.emit('request:enableSubmitAnswer');
  }
}]);