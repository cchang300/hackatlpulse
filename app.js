var express = require('express');
var app = express();
var lame = require('lame');
var Stream = require('stream');
var PythonShell = require('python-shell');
var wav = require('wav');

var fs = require('fs');
var vm = require('vm');

var BinaryServer = require('binaryjs').BinaryServer;

var includeInThisContext = function(path) {
    var code = fs.readFileSync(path);
    vm.runInThisContext(code, path);
}.bind(this);
includeInThisContext(__dirname+"/lame.all.js");


app.get('/', function (req, res) {
  res.send('Hello World!');
});

var server = app.listen(8000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});

var pyshell = new PythonShell('audio.py');

var datastream = new Stream.Writable();
datastream._read = function noop() {}; // redundant? see update below



pyshell.on("message", function(data){
	process.stdin.push(data);

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
// raw PCM data from stdin gets piped into the encoder 

 

// the generated MP3 file gets piped to stdout 



// PCM data from stdin gets piped into the speaker



var binserv = BinaryServer({port: 9000});

binserv.on('connection', function(client){
  	console.log("new client connected");
  	var stream = client.createStream();
	encoder.pipe(stream);
});





