const http = require('http');
const request = require('request');
const port = process.env.PORT || 3000



const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
	var containerTasca = []

  function getStuff(playerInfo) { 
  	containerTasca.push(JSON.parse(playerInfo));
	} 

	function acabarStuff(){
			res.write('<style> table {font-family: arial, sans-serif;border-collapse: collapse;width: 100%;}td, th {border: 1px solid #dddddd;text-align: left;padding: 8px;}tr:nth-child(even) {background-color: #dddddd;}</style>')
			res.write('<table>')
			res.write("<tr><th>Username</th><th>Rank</th><th>LP</th><th>Wins</th><th>Losses</th><th>Winrate</th></tr>")
			for(var i = 0; i<containerTasca.length;i++){
			
				for(var j = 0; j < containerTasca[i].length;j++){
					res.write("<tr>")
					if(containerTasca[i][j].queueType== "RANKED_SOLO_5x5"){

						res.write("<td>"+containerTasca[i][j].summonerName+"</td>")
						res.write("<td>"+containerTasca[i][j].tier+" "+containerTasca[i][j].rank+"</td>")
						res.write("<td>"+containerTasca[i][j].leaguePoints+"</td>")
						res.write("<td>"+containerTasca[i][j].wins+"</td>")
						res.write("<td>"+containerTasca[i][j].losses+"</td>")
						//res.write("HOTSTREAK: "+ containerTasca[i][j].hotstreak)
						total = parseFloat(containerTasca[i][j].wins+containerTasca[i][j].losses)
						winrateaux = parseFloat(containerTasca[i][j].wins/total)
						winrate = winrateaux * 100
						res.write("<td>"+winrate.toFixed(2)+"% </td>")
						
								}
					res.write("</tr>")
				
				}
				
			}
			
			res.write('</table>')
		  	res.end("<h1>acabou</h1>");
	}


	var COUNT = 0


	var Henrique = {"id":"mk7PuHP9U4Qgr0LdTzgDH6uveRoJlI0aNOQROMs7uZmiBRk","name":"ShadowPsych0"};
	var Xon = {"id":"jZpsyJfdkP97T0So8Sy-xO_vrwdker8y4lXaiFTibWjY1AM","name":"Phos is Best"};
	var JP = {"id":"sz_e-rRCWW8k8EIIJLzVp6j3Oy4HSNxq6ZtX96wqHwn4ihw","name":"JPtheKiller"};
	var Peralta = {"id":"n3q6f0PLSmdrdsJsut1MqzNcoVnn3nihL75Oio-PudwB-oY","name":"DreamFast7"};
	var Fawn = {"id":"t_S-GgFc4Bdm0U_s4Y6GMA3wOiGEvnHVfhVsks3ga0OfFec","name":"F4wN"};
	var Fawn_Smurf = {"id":"4gMCMDUTOOKnNrSffTxFbX2LPJmrldYLkaNGJAvIIugPga3i","name":"1vs9 coinflip L9"};
	var JP_Smurf = {"id":"sPNKQMypiKJ0-Mo_UMwkz8uNlyzjKmdSwRA9VtqVw99YqWY","name":"JPteQuilla"};
	var Careca = {"id":"wKucKWkZguEC-8HEmRbArb6x_4PtNf7ImZSvVPkqeA2UtOM","name":"Carics"};
	var Ne = {"id":"fBQFxJWi4PQj4bU5J6hJFDp3T3c0SOidAhaD0Djrhrh7UAI","name":"Hi Im Xonigg3r"};

	var TASCA = [];

	TASCA.push(Henrique);
	TASCA.push(Xon);
	TASCA.push(JP);
	TASCA.push(Peralta);
	TASCA.push(Fawn);
	TASCA.push(Fawn_Smurf);
	TASCA.push(JP_Smurf);
	TASCA.push(Careca);
	TASCA.push(Ne);

	var TASQUEIROS = TASCA.length;

	var URL_INICIAL = "https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/"

	var URL_INICIAL2 = "?api_key=RGAPI-b2b946d1-04a4-4928-bb64-dbf9de1430be"
	
	var rank_participants = []

	for(var i = 0; i < TASQUEIROS;i++){

			request('https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/'+TASCA[i].id+'?api_key=RGAPI-b2b946d1-04a4-4928-bb64-dbf9de1430be', { json: true }, (err, res, body) => {
		 		 if (err) { return console.log(err); }
		 		 
				getStuff(JSON.stringify(body));
			
				COUNT++;
				if(COUNT == TASQUEIROS){
					console.log("ACABEI")
					acabarStuff();
				}
				});
		
	}

	//res.write("<h1>this is a title</h1>");

});

server.listen(port,() => {
  console.log(`Server running at port `+port);
});