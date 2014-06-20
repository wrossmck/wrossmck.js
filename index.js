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
	util.print('> ');
	
	// a new markov response (and tweet) will be made after each line on the stdin. 
	stdin.on('data', function (line) {
		var res = m.respond(line.toString()).join(' ');
		res = res.replace(/[\u0250-\ue007]/g, '');//removes some strange characters
		console.log(res);
		// send req to twitter
		twit.verifyCredentials(function (err, data) {
			if(err){console.log(err);}
			// console.log(data);
		});
		//uncommnet to acually post
		// .updateStatus(res,
		// 	function (err, data) {
		// 	if(err){console.log(err);}
		// 		// console.log(data);
		// 	}
		// );
	util.print('> ');
	});
});
