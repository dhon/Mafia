angular.module('app.services', [])

.factory('service', [function(){
	return{
			var user = {};
			user.games = 10;
			user.victories = 5;
			getUser: function() {
				return user;
			}
	}
}])

// .service('BlankService', [function(){

// }]);

