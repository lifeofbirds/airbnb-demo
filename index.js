// Require the twilio and HTTP modules
var twilio = require('twilio');
var http = require('http');
//var audio1Url = require('file-url');

var requestNumber = 1;
 
// Create an HTTP server, listening on port 80
http.createServer(function (req, res) {
    // Create a TwiML response and a greeting
    var audioFiles = [
    'http://www.anestheticaudio.com/sounds/rum-bottle.wav',
    'http://www.anestheticaudio.com/sounds/lost-transmission-drone.wav'
    ];

    function randomInt (low, high) {
    return Math.floor(Math.random() * (high - low + 1) + low);
	}

	var index = randomInt(0,(audioFiles.length-1));

    var songUrl = audioFiles[index];
    var resp = new twilio.TwimlResponse();
    resp.play(songUrl, {loop: 300});
 
 
    //Render the TwiML document using "toString"
    res.writeHead(200, {
        'Content-Type':'text/xml'
    });
    res.end(resp.toString());

    console.log ("Request number "+ requestNumber + "is listening to " + songUrl);
    requestNumber = requestNumber+++;
 
}).listen(80);
 
console.log('server listening on port 80');
