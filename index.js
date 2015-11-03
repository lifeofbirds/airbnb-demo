// Require the twilio and HTTP modules
var twilio = require('twilio'),
    http = require('http');
 
// Create an HTTP server, listening on port 1337
http.createServer(function (req, res) {
    // Create a TwiML response and a greeting
    var songUrl = 'http://picosong.com/6Ned'
    var resp = new twilio.TwimlResponse();
    resp.play(songUrl);
 
    // The <Gather> verb requires nested TwiML, so we pass in a function
    // to generate the child nodes of the XML document
 
    //Render the TwiML document using "toString"
    res.writeHead(200, {
        'Content-Type':'text/xml'
    });
    res.end(resp.toString());
 
}).listen(1337);
 
console.log('Visit http://localhost:80/ in your browser to see your TwiML document!');
