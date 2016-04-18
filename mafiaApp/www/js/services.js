angular.module('app.services', [])

.factory('services', [function(){
	var user={};
		user.games = 210;
		user.victories = 5;
	
	return{
		getUser: function(){
			return user;
		},
	}
}])

// .service('BlankService', [function(){

// }]);

