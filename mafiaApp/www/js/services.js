angular.module('app.services', [])

.factory('services', [function(){
	var users={};
		users.uname = "";
		users.plyr2 = "";
		users.plyr3 = "";
		users.plyr4 = "";
		users.plyr5 = "";
		users.plyr6 = "";
		users.plyr7 = "";

		users.role1 = "Mafia";
		users.role2 = "Cop";
		users.role3 = "Vanilla";
		users.role4 = "Mafia";
		users.role5 = "Medic";
		users.role6 = "Vanilla";
		users.role7 = "Vanilla";

		users.voted = "voted";

		users.games = 10;
		users.victories = 5;
		users.mafiaWin = 3;
		users.townWin = 2;
	
	return users;
}]);
