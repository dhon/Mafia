angular.module('app.controllers', [])
  
.controller('page1Ctrl', function($scope, $ionicNavBarDelegate) {
	$ionicNavBarDelegate.showBackButton(false);
})
   
.controller('addPlayersCtrl', function($scope, $ionicNavBarDelegate) {
	$ionicNavBarDelegate.showBackButton(false);
})
   
.controller('signupCtrl', function($scope, $ionicNavBarDelegate) {
	$ionicNavBarDelegate.showBackButton(false);
})
   
.controller('loginCtrl', function($scope, $ionicNavBarDelegate) {
	$ionicNavBarDelegate.showBackButton(false);
})
   
.controller('statsCtrl', function($scope, $ionicNavBarDelegate) {
	$ionicNavBarDelegate.showBackButton(false);
	$scope.user = services.getUser();
})
   
.controller('pendingCtrl', function($scope, $ionicNavBarDelegate) {
	$ionicNavBarDelegate.showBackButton(false);
})
   
.controller('gameNightCtrl', function($scope, $ionicNavBarDelegate) {
	$ionicNavBarDelegate.showBackButton(false);
})
   
.controller('gameDayCtrl', function($scope, $ionicNavBarDelegate) {
	$ionicNavBarDelegate.showBackButton(false);
})
   
.controller('voteCtrl', function($scope, $ionicNavBarDelegate) {
	$ionicNavBarDelegate.showBackButton(false);
})
   
.controller('rulesCtrl', function($scope, $ionicNavBarDelegate) {
	$ionicNavBarDelegate.showBackButton(false);
})
   
.controller('resultsCtrl', function($scope, $ionicNavBarDelegate) {
	$ionicNavBarDelegate.showBackButton(false);
})
 