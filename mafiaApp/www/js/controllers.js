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
	services.setButton();
	$scope.users = services.users;
})

.controller('gameNightCtrl', function($scope, $ionicNavBarDelegate, $ionicPopup, $timeout, $location, services) {
	$scope.$on('$ionicView.enter', function(){
		$ionicNavBarDelegate.showBackButton(false);
		$scope.users = services.users;

		//Code found on http://jsbin.com/haliz/1/edit?html,js,output
		//Written by Mario Zupan
		//Open-source
		$scope.counter = 8;
 		var mytimeout = null; 
		$scope.onTimeout = function() {
	        if($scope.counter ===  0) {
	            $scope.$broadcast('timer-stopped', 0);
	            $timeout.cancel(mytimeout);
	            return;
	        }
	        $scope.counter--;
	        mytimeout = $timeout($scope.onTimeout, 1000);
	    };

        mytimeout = $timeout($scope.onTimeout, 1000);

	    $scope.$on('timer-stopped', function(event, remaining) {
	        if(remaining === 0) {
	            $location.path('/page11');
	        }
	    });
	    //End of retrieved code

		if (services.isGameOver()){
			$location.path('/page13');
			$timeout.cancel(mytimeout);
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
			else if (services.validateRole(user) === "Mafioso" && services.users[0].role === "Mafioso"){
				var alertMafia = $ionicPopup.alert({
				title: 'Cannot Choose Player',
				template: 'You cannot choose another Mafioso!'
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
	});
})

.controller('gameDayCtrl', function($scope, $ionicNavBarDelegate, $ionicPopup, $timeout, $location, services) {
	$scope.$on('$ionicView.enter', function(){
		$ionicNavBarDelegate.showBackButton(false);
		$scope.users = services.users;

		services.setOtherTargets();
		services.mafiaKill();

		//Code found on http://jsbin.com/haliz/1/edit?html,js,output
		//Written by Mario Zupan
		//Open-source
		$scope.counter = 8;
 		var mytimeout = null; 
		$scope.onTimeout = function() {
	        if($scope.counter ===  0) {
	            $scope.$broadcast('timer-stopped', 0);
	            $timeout.cancel(mytimeout);
	            return;
	        }
	        $scope.counter--;
	        mytimeout = $timeout($scope.onTimeout, 1000);
	    };

        mytimeout = $timeout($scope.onTimeout, 1000);

	    $scope.$on('timer-stopped', function(event, remaining) {
	        if(remaining === 0) {
	            $location.path('/page9');
	        }
	    });
	    //End of retrieved code

		if (services.isGameOver()){
			$location.path('/page13');
			$timeout.cancel(mytimeout);
		}

		if (services.users[0].target === -1){
			var alertNoChoice = $ionicPopup.alert({
			title: 'No Choice',
			template: 'You did not choose anyone!'
			});
		}
		else{
			var messages = services.users[0].nightAction(0);
			var alert = $ionicPopup.alert({
			title: messages[0],
			template: messages[1]
			});
		}

		services.resetTarget();

		$scope.Nominate = function(user){
			if (services.validateStatus(user)){
				services.setNom(user);
				$timeout.cancel(mytimeout);
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
		
		//Code found on http://jsbin.com/haliz/1/edit?html,js,output
		//Written by Mario Zupan
		//Open-source
		$scope.counter = 8;
 		var mytimeout = null; 
		$scope.onTimeout = function() {
	        if($scope.counter ===  0) {
	            $scope.$broadcast('timer-stopped', 0);
	            $timeout.cancel(mytimeout);
	            return;
	        }
	        $scope.counter--;
	        mytimeout = $timeout($scope.onTimeout, 1000);
	    };

        mytimeout = $timeout($scope.onTimeout, 1000);

	    $scope.$on('timer-stopped', function(event, remaining) {
	        if(remaining === 0) {
	            $location.path('/postvote');
	        }
	    });
	    //End of retrieved code
	});
})

.controller('postVoteCtrl', function($scope, $ionicNavBarDelegate, $timeout, $location, services) {
	$scope.$on('$ionicView.enter', function(){		
		$ionicNavBarDelegate.showBackButton(false);
		services.checkVote();
		$scope.users = services.users;
		$scope.voted = services.voted;
		services.kill(services.voted.vname);
		
		//Code found on http://jsbin.com/haliz/1/edit?html,js,output
		//Written by Mario Zupan
		//Open-source
		$scope.counter = 10;
 		var mytimeout = null; 
		$scope.onTimeout = function() {
	        if($scope.counter ===  0) {
	            $scope.$broadcast('timer-stopped', 0);
	            $timeout.cancel(mytimeout);
	            return;
	        }
	        $scope.counter--;
	        mytimeout = $timeout($scope.onTimeout, 1000);
	    };

        mytimeout = $timeout($scope.onTimeout, 1000);

	    $scope.$on('timer-stopped', function(event, remaining) {
	        if(remaining === 0) {
	            $location.path('/page9');
	        }
	    });
	    //End of retrieved code
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
