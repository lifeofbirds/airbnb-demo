var http = require('http');
var fs = require('fs');
var util = require('util');
var express = require('express');
var app = express();

var log_file = fs.createWriteStream(__dirname + '/debug.log', {flags : 'w'});
var log_stdout = process.stdout;

app.set('view engine', 'jade');
app.use(express.static(__dirname + '/public'));


console.log = function(d) { //
  log_file.write(util.format(d) + '\n');
  log_stdout.write(util.format(d) + '\n');
};

var requestNumber = 0;

app.get('/', function (req, res) {

  var audioFiles = [
    'http://anestheticaudio.com/sounds/1.mp3',
    'http://anestheticaudio.com/sounds/2.mp3',
    'http://anestheticaudio.com/sounds/3.mp3',
    'http://anestheticaudio.com/sounds/4.mp3',
    'http://anestheticaudio.com/sounds/5.mp3',
    'http://anestheticaudio.com/sounds/6.mp3',
    'http://anestheticaudio.com/sounds/7.mp3',
    'http://anestheticaudio.com/sounds/8.mp3',
    'http://anestheticaudio.com/sounds/9.mp3',
    'http://anestheticaudio.com/sounds/10.mp3',
    'http://anestheticaudio.com/sounds/12.mp3',
    'http://anestheticaudio.com/sounds/13.mp3',
    'http://anestheticaudio.com/sounds/14.mp3',
    'http://anestheticaudio.com/sounds/15.mp3',
    'http://anestheticaudio.com/sounds/16.mp3',
    ];

  var index =  requestNumber % audioFiles.length;
  var audioUrl = audioFiles[index];

  console.log ("Request number "+ requestNumber + " is about to get " + audioUrl);
  requestNumber++;

  res.render('index', { audioUrl: audioUrl});
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('listening on port 3000');
});
 
