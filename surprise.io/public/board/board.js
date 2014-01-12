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

var currentQuestion = null;
var currentTile = null;
var didBind = false;

var quizControllers = angular.module('quizControllers', []);

quizControllers.controller('BoardCtrl', ['$scope', '$location', 'socket', function ($scope, $location, socket) {
  
  var interval;
  var tileNr;

  /* Helper function to emit */
  var emit = function(eventName, data){
    console.log(eventName, data);
    socket.emit(eventName, data);  
  }

  var init = function(){
    $scope.tiles = new Array();
    emit('request:getTiles');
    emit('request:setupTileSelection', Math.random());
  }

  var setTiles = function(tiles) {
    $scope.tiles = tiles;
  }

  $scope.$on('$destroy', function iVeBeenDismissed() {
    console.log('BoardCtrl is destroyed');
  });

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

    var iets = Math.random();

    currentQuestion = questions.pop();
    emit('request:tileSelected', {questionNr: currentQuestion.number, iets: iets});
  };

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
  };

  var goToNextRound = function(){
    console.log('receive:goToNextRound');
    console.log("Resetting state and starting new round");
    init();
    $location.path('/board');
  };

  if(!didBind){
    console.log('Binding board');
    socket.on('receive:getTiles', setTiles);
    socket.on('receive:startTileSelection', startTileSelection);
    socket.on('receive:selectTile', selectTile);
    socket.on('receive:showQuestion', showQuestion);
    socket.on('receive:goToNextRound', goToNextRound);
    socket.on('receive:doInit', init);
    didBind = true;
  }


  /* Hier gebleven. Volgende stap is overwegen of het blok 'setup tiles' 
   * beter op basis van een event vanuit de GameControls kan verlopen.
   * Vervolgens:
   * - Checken of het resetten van de status van het board werkt.
   * - 
   * - De lijst van vragen en de status daarvan persisten in local storage
   * - Glitches wegwerken. E.g. het soms willekeurig verschijnen van het 'start selectie' blok
   * - Opengaan van vakje animeren?
   * - Stylen
   * - Vragen verzinnen
   */

}]);

var didBindQuiz = false;
quizControllers.controller('QuestionCtrl', ['$scope', '$location', 'socket', function ($scope, $location, socket) {

  $scope.question = currentQuestion;
  var selectedAnswer = null;

  if(!didBindQuiz){
    didBindQuiz = true;
    
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

    socket.on('receive:doSubmitAnswer', function(data){
      console.log('receive:doSubmitAnswer');
      socket.emit('request:possiblyOpenTileAndEnableNextRound', {number: currentTile.number, correct: selectedAnswer.correct});
      if(selectedAnswer.correct){
        $location.path('/correct');
      } else {
        $location.path('/wrong');
      }
    });
  }

  var enableSubmitAnswer = function(){
    console.log('request:enableSubmitAnswer');
    socket.emit('request:enableSubmitAnswer');
  }
}]);