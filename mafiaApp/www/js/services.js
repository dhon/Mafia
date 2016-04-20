angular.module('app.services', [])

.factory('services', [function(){
	var roles=["Mafia", "Mafia", "Cop", "Medic", "Vanilla", "Vanilla", "Vanilla"];

	var users=[
		{uname:"",
		 role:""},
		{uname:"",
		 role:""},
		{uname:"",
		 role:""},
		{uname:"",
		 role:""},
		{uname:"",
		 role:""},
		{uname:"",
		 role:""},
		{uname:"",
		 role:""},
	];

	// users.voted = "voted"; 

	// users.games = 10;
	// users.victories = 5;
	// users.mafiaWin = 3;
	// users.townWin = 2;
	
	return {
		setRole: function(){
			var current = roles.length, temp, randomIndex;
			while (current !== 0){
				randomIndex = Math.floor(Math.random()*current);
				current -= 1;

				temp = roles[current];
				roles[current] = roles[randomIndex];
				roles[randomIndex] = temp;
			}

			for (var i = 0; i < users.length; i++){
				users[i].role = roles[i];
			}
		},
		resetAll: function(){
			users[0].role="";
			for (var i = 1; i < users.length; i++){
				users[i].uname="";
				users[i].role="";
			}
		},
		isUser: function(){
			if (users[0].uname===""){
				return false;
			}
			else{
				return true;
			}
		},
		users
	};
}]);
