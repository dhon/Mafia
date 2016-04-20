angular.module('app.services', [])

.factory('services', [function(){
	var roles=["Mafia", "Cop", "Medic", "Vanilla"];

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
			users[1].role = roles[Math.floor(Math.random()*4)];
			users[2].role = roles[Math.floor(Math.random()*4)];
			users[3].role = roles[Math.floor(Math.random()*4)];
			users[4].role = roles[Math.floor(Math.random()*4)];
			users[5].role = roles[Math.floor(Math.random()*4)];
			users[6].role = roles[Math.floor(Math.random()*4)];
			users[7].role = roles[Math.floor(Math.random()*4)];
		},
		resetAll: function(){
			for (var i = 0; i < users.length; i++){
				users[i].uname="";
				users[i].role="";
			}
		},
		users
	};
}]);
