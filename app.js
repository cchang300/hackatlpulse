var express = require('express');
var app = express();
var lame = require('lame');
var Stream = require('stream');
var PythonShell = require('python-shell');
var wav = require('wav');
var Type = require('type-of-is');

var fs = require('fs');
var vm = require('vm');

var BinaryServer = require('binaryjs').BinaryServer;

app.use("/public", express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + "/index2.html");
  //console.log("request");
});


var server = app.listen(8000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});

var mp3 = fs.createWriteStream('mukke.mp3');
b = new Buffer(5000, 'ascii');
var pyshell = new PythonShell('audio.py', {
	mode : 'string',
	parser : function(data){

		console.time("b64");
		//input: 16bit int i:  b64(string(i))
		input = data.split("---");
		var nb = Buffer(4096);
		var i = 0;
		input.forEach(function(data){
			
			var b = Buffer(data, 'base64');
			var s = b.toString('ascii')
			var n = parseInt(s,10);
			//console.log(n);
			nb.writeInt16LE(n,2*i); // 2, because a 16bit int takes two bytes.
			i++;
		});
		
		
		
		process.stdin.push(nb);
		console.timeEnd("b64");


	}


});





//var header = '5249464646c1150057415645666d7420100000000100020044ac000010b10200040010006461746100c01500'



pyshell.on("message", function(data){
	
	
});





//----------------------// funny shit:

//little endian!
var encoder = new lame.Encoder({
  // input 
  channels: 2,        
  bitDepth: 16,       // 16-bit samples 
  sampleRate: 44100,  // 44,100 Hz sample rate 
 
  // output 
  bitRate: 128,
  outSampleRate: 44100,
  mode: lame.STEREO // STEREO (default), JOINTSTEREO, DUALCHANNEL or MONO 
});
 
//pcm cross test:

/**
 var input = fs.createReadStream('test.pcm')

input.on('data',function(data){
	for (i = 0; i< data.length/2; i++){
		console.log(data.readInt16LE(i));


	}
	
	console.log("-------------");

});
**/


process.stdin.pipe(encoder).pipe(mp3);


/**

var binserv = BinaryServer({port: 9000});

binserv.on('connection', function(client){
  	//console.log("new client connected");
  	var stream = client.createStream();
	encoder.pipe(stream);

});
**/

encoder.on('data', function(data){
	//console.log(Type.string(data));
	//console.log(data.toString('binary'));
	//data.forEach(function(d){
	//	console.log(d);


	//});
	

});
/**
**/

/**
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


**/

