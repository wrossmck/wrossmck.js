var util = require('util');
var fs = require('fs');

var markov = require('markov');
var m = markov(1);

var auth = require('./auth.json');
var twitter = require('ntwitter');
var twit = new twitter(auth);

var s = fs.createReadStream(__dirname + '/text.txt');
m.seed(s, function () {
	var stdin = process.openStdin();
	util.print('[Hello] Enter some text to generate a resonse');
	util.print('> ');
	
	// a new markov response (and tweet) will be made after each line on the stdin. 
	stdin.on('data', function (line) {
		var res = m.respond(line.toString()).join(' ');
		res = res.replace(/[\u0250-\ue007]/g, '');//removes some strange characters
		console.log("[Response ]"+res);
		if(res.length >= 140){
			res = res.substring(0,140);// truncates to 140 characters
			console.log("[Truncated] "+res);
		}
		// send req to twitter
		if(res.trim()!==""){
			twit.verifyCredentials(function (err, data) {
				if(err){console.log(err);}
			}).updateStatus(res,
				function (err, data) {
				if(err){console.log(err);}
				}
			);
		}
	util.print('> ');
	});
});
