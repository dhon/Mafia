angular.module('app.controllers', [])

.controller('page1Ctrl', function($scope, $ionicNavBarDelegate, $ionicPopup, $location, services) {
	$ionicNavBarDelegate.showBackButton(false);
	$scope.checkUser = function(){
		if(services.isUser()){
			$location.path('/page3');
		}
		else{
			var alertPopup = $ionicPopup.alert({
				title: 'Cannot Create Game',
				template: 'Must login before creating a game!'
			});
		}
	}
})

.controller('addPlayersCtrl', function($scope, $ionicNavBarDelegate, services) {
	$ionicNavBarDelegate.showBackButton(false);
	$scope.users = services.users;
})

.controller('signupCtrl', function($scope, $ionicNavBarDelegate, services) {
	$ionicNavBarDelegate.showBackButton(false);
	$scope.users = services.users;
})

.controller('loginCtrl', function($scope, $ionicNavBarDelegate, services) {
	$ionicNavBarDelegate.showBackButton(false);
	$scope.users = services.users;
})

.controller('statsCtrl', function($scope, $ionicNavBarDelegate, services) {
	$ionicNavBarDelegate.showBackButton(false);
	$scope.stats = services.stats;
})

.controller('pendingCtrl', function($scope, $ionicNavBarDelegate, services) {
	$ionicNavBarDelegate.showBackButton(false);
	$scope.Role = function(){
		services.setRole();
	}
	$scope.users = services.users;
})

.controller('gameNightCtrl', function($scope, $ionicNavBarDelegate, $timeout, $location, services) {
	$ionicNavBarDelegate.showBackButton(false);
	$scope.users = services.users;
	$timeout(function(){
		$location.path('/page11');
	}, 8000);
})

.controller('gameDayCtrl', function($scope, $ionicNavBarDelegate, $timeout, $location, services) {
	$ionicNavBarDelegate.showBackButton(false);
	$scope.users = services.users;
	$timeout(function(){
		$location.path('/page10');
	}, 8000);
})

.controller('voteCtrl', function($scope, $ionicNavBarDelegate, $location, $timeout, services) {
	$ionicNavBarDelegate.showBackButton(false);
	$scope.users = services.users;
	$scope.Vote = function(vote){
		services.setVote(vote);
	}
	$timeout(function(){
		$location.path('/postvote');
	}, 8000);
})

.controller('postVoteCtrl', function($scope, $ionicNavBarDelegate, $timeout, $location, services) {
	$ionicNavBarDelegate.showBackButton(false);
	services.checkVote();
	$scope.users = services.users;
	$scope.voted = services.voted;
	$timeout(function(){
		$location.path('/page9');
	}, 8000);
})

.controller('rulesCtrl', function($scope, $ionicNavBarDelegate) {
	$ionicNavBarDelegate.showBackButton(false);
})

.controller('resultsCtrl', function($scope, $ionicNavBarDelegate, services) {
	$ionicNavBarDelegate.showBackButton(false);
	$scope.users = services.users;
	$scope.resetData = function(){
		services.resetAll();
	}
})
