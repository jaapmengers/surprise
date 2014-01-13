var app = angular.module('quizApp', ['ngRoute', 'quizControllers']);

app.config(['$routeProvider', 
	function($routeProvider){
		$routeProvider.
			when('/board', {
				templateUrl: 'partials/board.html',
				controller: 'BoardCtrl'
			}).
			when('/gamecontrols', {
				templateUrl: 'partials/gamecontrols.html',
				controller: 'GameControlsCtrl'
			}).
			otherwise({
				redirectTo: '/board'
			});
	}]);