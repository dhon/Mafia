angular.module('app.services', [])

.factory('services', [function(){
	var roles=[
	{rname: "Mafioso", raction:"Kill"},
	{rname: "Mafioso", raction:"Kill"},
	{rname: "Cop", raction: "Check"},
	{rname:"Medic", raction:"Save"},
	{rname: "Vanilla", raction:"Friend"},
	{rname: "Vanilla", raction:"Friend"},
	{rname: "Vanilla", raction:"Friend"}
	];

	var users=[
	{uname:"",role:"",act:"", status:true, button:"", vote:"No", saved:false, target:-1, message:"", nightAction:undefined},
	{uname:"",role:"",act:"", status:true, button:"", vote:"No", saved:false, target:-1, message:"", nightAction:undefined},
	{uname:"",role:"",act:"", status:true, button:"", vote:"No", saved:false, target:-1, message:"", nightAction:undefined},
	{uname:"",role:"",act:"", status:true, button:"", vote:"No", saved:false, target:-1, message:"", nightAction:undefined},
	{uname:"",role:"",act:"", status:true, button:"", vote:"No", saved:false, target:-1, message:"", nightAction:undefined},
	{uname:"",role:"",act:"", status:true, button:"", vote:"No", saved:false, target:-1, message:"", nightAction:undefined},
	{uname:"",role:"",act:"", status:true, button:"", vote:"No", saved:false, target:-1, message:"", nightAction:undefined}
	];

	var mafia = [];

	stats={};
	stats.games = 10;
	stats.victories = 5;
	stats.mafiaWin = 3;
	stats.townWin = 2;

	voted = {};
	voted.vname = {};
	voted.result = "live";

	winner = {};
	winner.team = "";

	function kill(user){
		user.status = false;
		user.button = user.uname + ' is dead. They were a ' + user.role + '.';
	};
	function save(user){
		user.saved = true;
	};
	function check(user){
		if (user.role === "Mafioso"){
			return "Mafia";
		}
		else{
			return "Town";
		}
	};
	
	return {
		resetTarget: function(){
			for (var i = 0; i < users.length; i++){
				users[i].target = -1;
			}
		},
		setTarget: function(index){
			users[0].target = index;
		},
		setOtherTargets: function(){
			//Set targets for all automated players
			for (var i = 1; i < users.length; i++){
				users[i].target = Math.floor(Math.random()*6 + 1);
			}
		},
		kill,
		mafiaKill: function(){
			if (users[0].role !== "Mafioso"){
				for (var i = 0; i < mafia.length; i++){
					//If the mafia player is alive and doesn't select another mafia player, 
					//then kill the player they select
					if (users[mafia[i]].status && users[users[mafia[i]].target].role !== "Mafioso"){
						kill(users[users[mafia[i]].target]);
						break; 
					}
				}
			}
		},
		save,
		check,
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
				if (users[i].role === "Mafioso"){
					mafia.push(i);
					users[i].nightAction = function(index){
						if (!users[users[index].target].saved){
							kill(users[users[index].target]);
							return ["Mafia Kill",
							"You killed " + users[users[index].target].uname + "."];
						}
						else{
							return ["Mafia Kill",
							"You failed to kill " + users[users[index].target].uname + "."];
						}
					}
				}
				else if (users[i].role === "Cop"){
					users[i].nightAction = function(index){
						role = check(users[users[index].target]);
						return ["Cop Check", 
						users[users[index].target].uname + " is a member of the " + role + "."];
					}
				}
				else if (users[i].role === "Medic"){
					users[i].nightAction = function(index){
						save(users[users[index].target]);
						return ["Medic Save", 
						"You chose to save " + users[users[index].target].uname + "."];
					}
				}
				else{
					users[i].nightAction = function(){
						return ["Vanilla", "You did nothing!"];
					}
				}
			}
			//Keep track of the mafia team
			users[mafia[0]].message = "Your partner is " +users[mafia[1]].uname+ ".";
			users[mafia[1]].message = "Your partner is " +users[mafia[0]].uname+ ".";
		},
		setButton: function(){
			for (var i = 0; i < users.length; i++){
				users[i].button = users[i].uname;
			}
		},
		resetAll: function(){
			users[0].role="";
			for (var i = 1; i < users.length; i++){
				users[i].uname="";
				users[i].role="";
				users[i].act="";
				users[i].status = true;
				users[i].button = "";
				users[i].vote = "No";
				users[i].saved = false;
				users[i].target = -1;
				users[i].message = "";
				users[i].nightAction = undefined;
			}
			mafia = [];
			voted.vname = {};
			voted.result = "";
			winner.team = "";
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
			//Set votes for all automated players
			for (var i = 1; i < users.length; i++){
				// if (i%2 === 0){
				if (users[i].status){
					users[i].vote = "Yes";
				}
				else {
					users[i].vote = "Dead. They were a "+users[i].role;
				}
				// }
				// else{
				// 	users[i].vote = "No";
				// }
			}
		},
		checkVote: function(){
			var count = 0;
			var alive = 0;
			var majority = 0;
			voted.result = "live";
			for (var i = 0; i < users.length; i++){
				if (users[i].status){
					alive += 1;
					if (users[i].vote === "Yes"){
						count += 1;
					}
				}
			}
			majority = alive;
			if (alive % 2 == 1){
				majority++;
			}
			if (count >= majority/2)
				voted.result = "die";
		},
		isGameOver: function(){
			var town = 0;
			var mafia = 0;
			for(i = 0; i < users.length; i++){
				if(users[i].status && users[i].role === "Mafioso"){
					mafia+=1;
				}else if(users[i].status){
					town+=1;
				}
			}
			if (mafia === town){
				winner.team = "Mafia";
				return true;
			}
			if (mafia === 0){
				winner.team = "Town";
				return true;
			}
			return false;
		},
		users,
		voted,
		winner,
		stats
	};
}]);
