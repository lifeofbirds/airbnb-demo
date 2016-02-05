//node server that pulls URLs to audio files from a given aws s3 bucket and serves them consecutively per http request.
//built for 200 channel/phone audio experience for airbnb

var http = require('http');
var fs = require('fs');
var util = require('util');
var express = require('express');
var app = express();
var AWS = require('aws-sdk');

var credentials = new AWS.SharedIniFileCredentials({profile: 'personal-account'});
AWS.config.credentials = credentials;

var s3 = new AWS.S3();

var fullBucket = []
var allKeys = [];
var audioUrls = [];

var S3Params = {Bucket: 'airsnd'}; //set s3 bucket name here

//gets temporary signed URLs for each object in the s3 bucket given an array of s3 keys
function fetchUrls (keys){
  for (var i = 0; i < keys.length; i++){
    var currentKey = keys[i];
    var params = {Bucket: S3Params.Bucket, Key: currentKey};
    s3.getSignedUrl('getObject', params, function (err, url) {
    audioUrls.push(url);
    });
  }
}

//this will fill allKeys with the full/current list of keys from s3 bucket each time the server is restarted
s3.listObjects(S3Params, function(err, data) {  
  if (err) {
  console.log(err, err.stack); 
  }
  else {
    fullBucket = data.Contents; 
    }
  for (var i = 0; i < fullBucket.length; i++){
    allKeys.push(fullBucket[i].Key);
  }
  fetchUrls(allKeys);
});

var log_file = fs.createWriteStream(__dirname + '/debug.log', {flags : 'w'});
var log_stdout = process.stdout;

//replaces console.log with a logfile + stdout
console.log = function(d) { 
  log_file.write(util.format(d) + '\n');
  log_stdout.write(util.format(d) + '\n');
};

var requestNumber = 0; //keeps track of how many http requests the server has gotten since last restart

//webserver
app.set('view engine', 'jade');
app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) { 

  var index =  requestNumber % audioUrls.length; //sets a looping index per request based on the # of soundfiles that came down from s3
  var audioUrl = audioUrls[index];

  console.log ("Request number "+ requestNumber + " is about to get " + audioUrl);
  
  requestNumber++; //increments server request index

  res.render('index', { audioUrl: audioUrl});
});

var serverPort = 80
var server = app.listen(serverPort, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('listening on port '+serverPort);
});
 
