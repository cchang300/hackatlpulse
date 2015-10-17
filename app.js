var express = require('express');
var app = express();
var lame = require('lame');
var Stream = require('stream');
var PythonShell = require('python-shell');
var wav = require('wav');

var fs = require('fs');
var vm = require('vm');

//var BinaryServer = require('binaryjs').BinaryServer;



//app.get('/', function (req, res) {
//  res.send('Hello World!');
//});

//var server = app.listen(8000, function () {
//  var host = server.address().address;
//  var port = server.address().port;
//
//  console.log('Example app listening at http://%s:%s', host, port);
//});
/**
var pyshell = new PythonShell('audio.py');

var datastream = new Stream.Writable();
datastream._read = function noop() {}; // redundant? see update below
datastream._write = function noop() {};


pyshell.on("message", function(data){
	//change to another stream
	process.stdin.push(data);
	//mystream.push(data);
});


//----------------------// funny shit:



var encoder = new lame.Encoder({
  // input 
  channels: 1,        // 2 channels (left and right) 
  bitDepth: 16,       // 16-bit samples 
  sampleRate: 44100,  // 44,100 Hz sample rate 
 
  // output 
  bitRate: 128,
  outSampleRate: 22050,
  mode: lame.STEREO // STEREO (default), JOINTSTEREO, DUALCHANNEL or MONO 
});
 

 process.stdin.pipe(encoder);



var binserv = BinaryServer({port: 9000});

binserv.on('connection', function(client){
  	console.log("new client connected");
  	var stream = client.createStream();
	encoder.pipe(stream);
});
**/



var BinaryServer = require('binaryjs').BinaryServer;
var fs = require('fs');

// Start Binary.js server
var server = BinaryServer({port: 9000});
console.log("server started");
// Wait for new user connections
server.on('connection', function(client){
  // Stream a flower as a hello!
  console.log("new connection");
  var file = fs.createReadStream(__dirname + '/flower.png');
  client.send(file); 
});




