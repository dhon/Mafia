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

.controller('gameNightCtrl', function($scope, $ionicNavBarDelegate, $ionicPopup, $timeout, $location, services) {
	$scope.$on('$ionicView.enter', function(){
		$ionicNavBarDelegate.showBackButton(false);
		$scope.users = services.users;

		if (services.isGameOver()){
			$location.path('/page13');
		}

		$scope.Act = function(user){
			if (user === 0){
				var alertSame = $ionicPopup.alert({
				title: 'Cannot Choose Player',
				template: 'You cannot choose yourself!'
				});
			}
			else if (!services.users[user].status){
				var alertDead = $ionicPopup.alert({
				title: 'Cannot Choose Player',
				template: 'This player is dead!'
				});
			}
			else if (services.validateRole(user) === "Mafia" && services.users[0].role === "Mafia"){
				var alertMafia = $ionicPopup.alert({
				title: 'Cannot Choose Player',
				template: 'You cannot choose another Mafia!'
				});
			}
			else {
				var alertTarget = $ionicPopup.alert({
				title: 'Your Pick',
				template: 'You chose '+services.users[user].uname
				})
				services.setTarget(user);
			}
		}
		$timeout(function(){
			$location.path('/page11');
		}, 8000);
	});
})

.controller('gameDayCtrl', function($scope, $ionicNavBarDelegate, $ionicPopup, $timeout, $location, services) {
	$scope.$on('$ionicView.enter', function(){
		$ionicNavBarDelegate.showBackButton(false);
		$scope.users = services.users;
		timer = $timeout(function(){
			$location.path('/page9');
		}, 8000);

		if (services.users[0].role === "Medic"){
			services.save(services.users[services.users[0].target]);
			var alertRole = $ionicPopup.alert({
			title: 'Medic Save',
			template: 'You chose to save '+services.users[services.users[0].target].uname
			});			
		}
		else if (services.users[0].role === "Cop"){
			role = services.check(services.users[services.users[0].target]);
			var alertRole = $ionicPopup.alert({
			title: 'Cop Check',
			template: services.users[services.users[0].target].uname+' is a member of the '+ role
			});
		}
		else if (services.users[0].role === "Mafia"){
			if (!services.users[services.users[0].target].saved){
				services.kill(services.users[services.users[0].target]);
				var alertKill = $ionicPopup.alert({
				title: 'Mafia Kill',
				template: 'You killed '+services.users[services.users[0].target].uname
				});
			}
			else{
				var alertKill = $ionicPopup.alert({
				title: 'Mafia Kill',
				template: 'You failed to kill '+services.users[services.users[0].target].uname
				});
			}
		}
		else{
			var alertVanilla = $ionicPopup.alert({
			title: 'Vanilla',
			template: 'You did nothing!'
			});
		}
		services.resetTarget();

		if (services.isGameOver()){
			$location.path('/page13');
		}

		$scope.Nominate = function(user){
			if (services.validateStatus(user)){
				services.setNom(user);
				$timeout.cancel(timer);
				$location.path('/page10');
			}
			else {
				var alertPopup = $ionicPopup.alert({
				title: 'Cannot Choose Player',
				template: 'This player is dead!'
				});
			}
		}
	});
})

.controller('voteCtrl', function($scope, $ionicNavBarDelegate, $location, $timeout, services) {
	$scope.$on('$ionicView.enter', function(){
		$ionicNavBarDelegate.showBackButton(false);
		$scope.Vote = function(vote){
			services.setVote(vote);
		}
		$scope.users = services.users;
		$scope.voted = services.voted;
		$timeout(function(){
			$location.path('/postvote');
		}, 8000);
	});
})

.controller('postVoteCtrl', function($scope, $ionicNavBarDelegate, $timeout, $location, services) {
	$scope.$on('$ionicView.enter', function(){		
		$ionicNavBarDelegate.showBackButton(false);
		services.checkVote();
		$scope.users = services.users;
		$scope.voted = services.voted;
		services.kill(services.voted.vname);
		$timeout(function(){
			$location.path('/page9');
		}, 8000);
	});
})

.controller('rulesCtrl', function($scope, $ionicNavBarDelegate) {
	$ionicNavBarDelegate.showBackButton(false);
})

.controller('resultsCtrl', function($scope, $ionicNavBarDelegate, services) {
	$ionicNavBarDelegate.showBackButton(false);
	$scope.users = services.users;
	$scope.winner = services.winner.team;
	$scope.resetData = function(){
		services.resetAll();
	}
})
