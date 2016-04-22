angular.module('app.services', [])

.factory('services', [function(){
	var roles=[
	{rname: "Mafia", raction:"Kill"},
	{rname: "Mafia", raction:"Kill"},
	{rname: "Cop", raction: "Check"},
	{rname:"Medic", raction:"Save"},
	{rname: "Vanilla", raction:"Friend"},
	{rname: "Vanilla", raction:"Friend"},
	{rname: "Vanilla", raction:"Friend"}
	];

	var users=[
	{uname:"",role:"",act:"", status:true, vote:"No", saved:false, target:-1},
	{uname:"",role:"",act:"", status:true, vote:"No", saved:false, target:-1},
	{uname:"",role:"",act:"", status:true, vote:"No", saved:false, target:-1},
	{uname:"",role:"",act:"", status:true, vote:"No", saved:false, target:-1},
	{uname:"",role:"",act:"", status:true, vote:"No", saved:false, target:-1},
	{uname:"",role:"",act:"", status:true, vote:"No", saved:false, target:-1},
	{uname:"",role:"",act:"", status:true, vote:"No", saved:false, target:-1}
	];

	stats={};
	stats.games = 10;
	stats.victories = 5;
	stats.mafiaWin = 3;
	stats.townWin = 2;


	voted = {};
	voted.vname = {};
	voted.result = "live";
	
	return {
		resetTarget: function(){
			for (var i = 0; i < users.length; i++){
				users[i].target = -1;
			}
		},
		setTarget: function(index){
			users[0].target = index;
		},
		kill: function(user){
			user.status = false;
		},
		save: function(user){
			user.saved = true;
		},
		check: function(user){
			if (user.role === "Mafia"){
				return "Mafia";
			}
			else{
				return "Town";
			}
		},
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
				users[i].role = roles[i].rname;
				users[i].act = roles[i].raction;
			}

		},
		resetAll: function(){
			users[0].role="";
			for (var i = 1; i < users.length; i++){
				users[i].uname="";
				users[i].role="";
				users[i].act="";
				users[i].status = true;
				users[i].vote = "No";
				users[i].saved = false;
				users[i].target = -1;
			}
		},
		isUser: function(){
			// if (users[0].uname===""){
			// 	return false;
			// }
			// else{
			// 	return true;
			// }
			return true;
		},
		setNom: function(user){
			voted.vname = users[user];
		},
		validateStatus: function(user){
			return users[user].status;
		},
		validateRole: function(user){
			return users[user].role;
		},
		setVote: function(vote){
			if (vote){
				users[0].vote = "Yes";
			}
			else{
				users[0].vote = "No";
			}
			for (var i = 1; i < users.length; i++){
				if (i%2 === 0){
					users[i].vote = "Yes";
				}
				else{
					users[i].vote = "No";
				}
			}
		},
		checkVote: function(){
			var count = 0;
			for (var i = 0; i < users.length; i++){
				if (users[i].vote === "Yes"){
					count += 1;
				}
			}
			if (count >= 4){
				voted.result = "die";
			}
		},
		users,
		voted,
		stats
	};
}]);
