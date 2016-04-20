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
			users[0].role = roles[Math.floor(Math.random()*4)];
			users[1].role = roles[Math.floor(Math.random()*4)];
			users[2].role = roles[Math.floor(Math.random()*4)];
			users[3].role = roles[Math.floor(Math.random()*4)];
			users[4].role = roles[Math.floor(Math.random()*4)];
			users[5].role = roles[Math.floor(Math.random()*4)];
			users[6].role = roles[Math.floor(Math.random()*4)];
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
