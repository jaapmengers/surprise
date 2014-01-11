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

var didBind = false;

/* First, does some routing if necessary. Sets up selection of tile and gets a question  */
quizControllers.controller('BoardCtrl', ['$scope', '$location', 'socket', function ($scope, $location, socket) {
  
  /* Helper function to emit */
  var emit = function(eventName){
    socket.emit(eventName, null, function(s, args){
      //Error handling
    });  
  }

  /* Hier gebleven. Volgende stap is overwegen of het blok 'setup tiles' 
   * beter op basis van een event vanuit de GameControls kan verlopen.
   * Vervolgens:
   * - Checken of het resetten van de status van het board werkt.
   * - De lijst van vragen en de status daarvan persisten in local storage
   * - Glitches wegwerken. E.g. het soms willekeurig verschijnen van het 'start selectie' blok
   * - Opengaan van vakje animeren?
   * - Stylen
   * - Vragen verzinnen
   */

  /* Setup tiles */
  $scope.tiles = new Array();

  emit('request:getTiles');

  console.log(currentQuestion, currentTile);
  if(!currentQuestion && !currentTile){
    emit('request:setupTileSelection');
  }

  var interval;
  var tileNr;


  if(!didBind){

    didBind = true;

    socket.on('receive:getTiles', function (data) {
      $scope.tiles = data;
    });

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

    socket.on('receive:goToNextRound', function(){
      console.log("Resetting state and starting new round");
      currentQuestion = currentTile = null;
      $location.path('/board');
    });
  }
}]);


var didBindQuiz = false;
quizControllers.controller('QuestionCtrl', ['$scope', '$location', 'socket', function ($scope, $location, socket) {

  $scope.question = currentQuestion;
  var selectedAnswer = null;

  if(!didBindQuiz){
    didBindQuiz = true;
    
    socket.on('receive:doAnswer', function(data){
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
      socket.emit('request:possiblyOpenTileAndEnableNextRound', {number: currentTile.number, correct: selectedAnswer.correct});
      if(selectedAnswer.correct){
        $location.path('/correct');
      } else {
        $location.path('/wrong');
      }
    });
  }

  var enableSubmitAnswer = function(){
    socket.emit('request:enableSubmitAnswer');
  }
}]);