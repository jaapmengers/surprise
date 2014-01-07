var app = angular.module('quizApp', ['ngRoute', 'quizControllers']);

app.config(['$routeProvider', 
	function($routeProvider){
		$routeProvider.
			when('/hulplijn', {
				templateUrl: 'partials/supportVote.html',
				controller: 'SupportVoteCtrl'
			}).
			when('/board', {
				templateUrl: 'partials/board.html',
				controller: 'BoardCtrl'
			}).
			when('/question/:questionId/:tileId', {
				templateUrl: 'partials/question.html',
				controller: 'QuestionCtrl'
			}).
			when('/controller', {
				templateUrl: 'partials/controller.html',
				controller: 'ControllerCtrl'
			}).
			otherwise({
				redirectTo: '/hulplijn'
			});
	}]);