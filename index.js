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

var S3Params = {Bucket: 'airsnd'};

function fetchUrls (keys){
  for (var i = 0; i < keys.length; i++){
    var currentKey = keys[i];
    var params = {Bucket: S3Params.Bucket, Key: currentKey};
    s3.getSignedUrl('getObject', params, function (err, url) {
    audioUrls.push(url);
    });
  }
}

s3.listObjects(S3Params, function(err, data) {  //this will full allkeys with the full list of keys from s3 bucket
  if (err) {
  console.log(err, err.stack); // an error occurred
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

app.set('view engine', 'jade');
app.use(express.static(__dirname + '/public'));


console.log = function(d) { //
  log_file.write(util.format(d) + '\n');
  log_stdout.write(util.format(d) + '\n');
};

var requestNumber = 0;

app.get('/', function (req, res) {

  var index =  requestNumber % audioUrls.length;
  var audioUrl = audioUrls[index];

  console.log ("Request number "+ requestNumber + " is about to get " + audioUrl);
  requestNumber++;

  res.render('index', { audioUrl: audioUrl});
});

var server = app.listen(80, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('listening on port 80');
});
 
