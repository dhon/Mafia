/*THIS FILE IS THE MODEL. IT CONTAINS ARRAYS OF ROLES
AND USERS AS WELL AS ALL FUNCTIONS CALLED FROM THE
CONTROLLER. ALL OBJECTS IN THIS FILE AS WELL AS ALL
FUNCTIONS ARE IN A RETURN BLOCK. THEY ARE RETURNED TO
controllers.js WHERE THEY ARE ACCESSED. */

angular.module('app.services', [])

.factory('services', [function(){
	//Static array that sets the rols in the game and the actions each role has. This may be modified
	//for adding more players or roles by extending the array.
	var roles=[
	{rname: "Mafioso", raction:"Kill"},
	{rname: "Mafioso", raction:"Kill"},
	{rname: "Cop", raction: "Check"},
	{rname:"Medic", raction:"Save"},
	{rname: "Vanilla", raction:"Friend"},
	{rname: "Vanilla", raction:"Friend"},
	{rname: "Vanilla", raction:"Friend"}
	];

	//Dynamic array of all players in game. May be extended for more players. Each user is an object with
	//attributes needed for the game.
	var users=[
	{uname:"",role:"",act:"", status:true, button:"", vote:"No", saved:false, target:-1, message:"", nightAction:undefined},
	{uname:"",role:"",act:"", status:true, button:"", vote:"No", saved:false, target:-1, message:"", nightAction:undefined},
	{uname:"",role:"",act:"", status:true, button:"", vote:"No", saved:false, target:-1, message:"", nightAction:undefined},
	{uname:"",role:"",act:"", status:true, button:"", vote:"No", saved:false, target:-1, message:"", nightAction:undefined},
	{uname:"",role:"",act:"", status:true, button:"", vote:"No", saved:false, target:-1, message:"", nightAction:undefined},
	{uname:"",role:"",act:"", status:true, button:"", vote:"No", saved:false, target:-1, message:"", nightAction:undefined},
	{uname:"",role:"",act:"", status:true, button:"", vote:"No", saved:false, target:-1, message:"", nightAction:undefined}
	];

	//Array holding all players on the Mafia team
	var mafia = [];

	//Static object holding the host's statistics. Would be dynamically generated for multiplayer.
	stats={};
	stats.games = 10;
	stats.victories = 5;
	stats.mafiaWin = 3;
	stats.townWin = 2;

	//Object containing most recent player put up to vote, and the result of that vote.
	voted = {};
	voted.vname = {};
	voted.result = "live";

	//Object set to the winning team to be displayed on the results page
	winner = {};
	winner.team = "";

	//The following 3 functions perform the actions of Mafia, Medic, and Cop respectively
	function kill(user){
		user.status = false;
		//Updates button to show dead status
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

	//these functions allow us to retrieve and create players for testing
	function getUser(index){
		return users[index];
	};
	function setUserName(index, name){
		users[index].uname = name;
	};
	function setUserRole(index, role){
		users[index].role = role;
	};
	function setUserVote(index, vote){
		users[index].vote = vote;
	};
	function getUserVoteResult(){
		return voted.result;
	};
	function setUserVoteResult(result){
		voted.result = result;
	};
	//BEGINNING OF RETURN BLOCK. CONTAINS ALL FUNCTIONS AND OBJECTS ACCESSED BY controllers.js
	return {
		getUser, setUserName, setUserRole, setUserVoteResult, getUserVoteResult, setUserVote,
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
				var index = Math.floor(Math.random()*6 + 1);
				while (!users[index].status){
					index = Math.floor(Math.random()*6 + 1);
				}
				users[i].target = index;
			}
		},
		kill,
		mafiaKill: function(){
			//Allows automated mafia player to select its kill. 
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
		medicSave: function(){
			//Allows automated medic player to select its save.
			if (users[0].role !== "Medic"){
				for (var i = 1; i < users.length; i++){
					if (users[i].role === "Medic"){
						save(users[users[i].target]);
						break;
					}
				}
			}
		},
		save,
		check,
		setRole: function(){
			//Randomly scramble roles array
			var current = roles.length, temp, randomIndex;
			while (current !== 0){
				randomIndex = Math.floor(Math.random()*current);
				current -= 1;

				temp = roles[current];
				roles[current] = roles[randomIndex];
				roles[randomIndex] = temp;
			}
			//Assign newly scrambled roles array to users array 1 to 1 and assign 
			//nightAction function for each user depending on their role.
			//Return value of each nightAction function is an array of messages to be
			//displayed in a popup box during Day based on result of the action.
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
		//Each button will initially display the user's name
		setButton: function(){
			for (var i = 0; i < users.length; i++){
				users[i].button = users[i].uname;
			}
		},
		//Called at the end of a game. Resets all game data to the default, except for the host user's
		//username, so they can remain logged in.
		resetAll: function(){
			for (var i = 0; i < users.length; i++){
				if (i !== 0){
					users[i].uname="";
				}
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
			if (users[0].uname===""){
				return false;
			}
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
			//Randomly set votes for all automated players
			var choice = 0;
			for (var i = 1; i < users.length; i++){
				choice = Math.floor(Math.random()*2);
				if (users[i].status){
					if (choice === 0){
						users[i].vote = "Yes";
					}
					else{
						users[i].vote = "No";
					}
				}
				else {
					users[i].vote = "Dead. They were a "+users[i].role;
				}
			}
		},
		checkVote: function(){
			//Checks the outcome of voting by checking the majority of votes from living players.
			//Ties go to live rather than die.
			var count = 0;
			var alive = 0;
			var majority = 0;
			var odd = false;
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
				var odd = true;
			}
			if (odd && count >= majority/2){
				voted.result = "die";
			}
			else if (count > majority/2){
				voted.result = "die";
			}
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
