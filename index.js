// Require the twilio and HTTP modules
var twilio = require('twilio');
var http = require('http');
//var audio1Url = require('file-url');

var requestNumber = 0;
 
// Create an HTTP server, listening on port 80
http.createServer(function (req, res) {
    // Create a TwiML response and a greeting
    var audioFiles = [
    'http://anestheticaudio.com/sounds/doorbell-1.wav',
    'http://anestheticaudio.com/sounds/doorbell-2.wav',
    'http://anestheticaudio.com/sounds/doorbell-3.wav',
    'http://anestheticaudio.com/sounds/doorbell-4.wav',
    'http://anestheticaudio.com/sounds/doorbell-5.wav',
    'http://anestheticaudio.com/sounds/doorbell-6.wav',
    'http://anestheticaudio.com/sounds/doorbell-7.wav'
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
