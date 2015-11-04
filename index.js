// Require the twilio and HTTP modules
var twilio = require('twilio');
var http = require('http');
var audio1Url = require('file-url');

 
// Create an HTTP server, listening on port 80
http.createServer(function (req, res) {
    // Create a TwiML response and a greeting
    var songUrl = audio1Url('audio/onewish.jpg');
    var resp = new twilio.TwimlResponse();
    resp
 
    //Render the TwiML document using "toString"
    res.writeHead(200, {
        'Content-Type':'text/xml'
    });
    res.end(resp.toString());
 
}).listen(80);
 
console.log('Visit http://localhost:80/ in your browser to see your TwiML document!');
