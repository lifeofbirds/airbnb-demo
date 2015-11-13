// Require the twilio and HTTP modules
var twilio = require('twilio');
var http = require('http');
ar fs = require('fs');
var util = require('util');
var log_file = fs.createWriteStream(__dirname + '/debug.log', {flags : 'w'});
var log_stdout = process.stdout;

console.log = function(d) { //
  log_file.write(util.format(d) + '\n');
  log_stdout.write(util.format(d) + '\n');
};
//var audio1Url = require('file-url');

var requestNumber = 0;
 
// Create an HTTP server, listening on port 80
http.createServer(function (req, res) {
    // Create a TwiML response and a greeting
    var audioFiles = [
    'http://anestheticaudio.com/sounds/1.mp3',
    'http://anestheticaudio.com/sounds/2.mp3',
    'http://anestheticaudio.com/sounds/3.mp3',
    'http://anestheticaudio.com/sounds/4.mp3',
    'http://anestheticaudio.com/sounds/5.mp3',
    'http://anestheticaudio.com/sounds/6.mp3',
    'http://anestheticaudio.com/sounds/7.mp3'
    'http://anestheticaudio.com/sounds/8.mp3',
    'http://anestheticaudio.com/sounds/9.mp3',
    'http://anestheticaudio.com/sounds/10.mp3',
    'http://anestheticaudio.com/sounds/12.mp3',
    'http://anestheticaudio.com/sounds/13.mp3',
    'http://anestheticaudio.com/sounds/14.mp3',
    'http://anestheticaudio.com/sounds/15.mp3',
    'http://anestheticaudio.com/sounds/16.mp3'
    ];

 // old randomizer fn	
 // 	function randomInt (low, high) {
 // 		return Math.floor(Math.random() * (high - low + 1) + low);
	// }


	var index =  requestNumber % audioFiles.length;
    var songUrl = audioFiles[index];
    var resp = new twilio.TwimlResponse();
    resp.play(songUrl, {loop: 3000});
 
 
    //Render the TwiML document using "toString"
    res.writeHead(200, {
        'Content-Type':'text/xml'
    });
    res.end(resp.toString());

    console.log ("Request number "+ requestNumber + " is listening to " + songUrl);
    requestNumber++;
 
}).listen(80);
 
console.log('server listening on port 80');
