angular.module('app.controllers', [])

.controller('page1Ctrl', function($scope, $ionicNavBarDelegate) {
	$ionicNavBarDelegate.showBackButton(false);
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
	$scope.users = services.users;
})

.controller('pendingCtrl', function($scope, $ionicNavBarDelegate, services) {
	$ionicNavBarDelegate.showBackButton(false);
	$scope.Role = function(){
		services.setRole();
	}
	$scope.users = services.users;
})

.controller('gameNightCtrl', function($scope, $ionicNavBarDelegate, services) {
	$ionicNavBarDelegate.showBackButton(false);
	$scope.users = services.users;
})

.controller('gameDayCtrl', function($scope, $ionicNavBarDelegate, services) {
	$ionicNavBarDelegate.showBackButton(false);
	$scope.users = services.users;
})

.controller('voteCtrl', function($scope, $ionicNavBarDelegate, services) {
	$ionicNavBarDelegate.showBackButton(false);
	$scope.users = services.users;
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
