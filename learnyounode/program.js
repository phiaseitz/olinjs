//  Baby Steps
// var total = 0;
// for (var i = 2; i < process.argv.length; i++) {
// 	total += +process.argv[i];
// };
// console.log(total);

//  My First I/O
// var path = process.argv[2];
// var fs = require('fs');
// var fileBuffer = fs.readFileSync(path);
// var fileString = fileBuffer.toString();
// console.log(fileString.split("\n").length - 1);

//  My First Async I/O
// var fs = require('fs');
// fs.readFile(process.argv[2], 'utf8', function doneReading (err, data){
// 	if (err) {
// 		console.log("ERROR");
// 		console.log(err);
// 	} else {
// 		console.log(data.split("\n").length -1);
// 	}
// });

//  Filtered LS
// var fs = require('fs');
// fs.readdir(process.argv[2], function callback(err, list){
// 	for (var i = 0; i < list.length; i++) {
// 		var filename = list[i].split('.');
// 		var fileExt = filename[filename.length-1];
// 		if(fileExt === process.argv[3] && filename.length > 1){
// 			console.log(list[i]);
// 		}
// 	}
// })

//  Make It Modular
// var mymodule = require('./mymodule.js');
// mymodule(process.argv[2], process.argv[3], function (err, data) {
// 	if (err) {
// 		console.log(err);
// 	} else {
// 		for (var i = 0; i < data.length; i++){
// 			console.log(data[i]);
// 		}
// 	}
// });

// HTTP Client
// var http = require('http');
// http.get(process.argv[2], function callback (response) {
// 	response.setEncoding('utf8');
// 	response.on("data", function (data) {
// 		console.log(data);
// 	});
// });

//HTTP Collect
// var http = require('http');
// var bl = require('bl');
// http.get(process.argv[2], function callback (response) {
// 	response.pipe(bl(function (err, data) { 
// 		console.log(data.toString().length)
// 		console.log(data.toString());
// 	}))
// });

// Juggling ASYNC
// var http = require('http');
// var bl = require('bl');
// var resp1 = null;
// var resp2 = null;
// var resp3 = null;
// function printall (resp1, resp2, resp3){
// 	console.log(resp1);
// 	console.log(resp2);
// 	console.log(resp3);
// }
// http.get(process.argv[2], function callback (response) {
// 	response.pipe(bl(function (err, data) { 
// 		resp1 = data.toString();
// 		if (resp2 && resp3){
// 			printall(resp1, resp2, resp3);
// 		}
// 	}))
// });
// http.get(process.argv[3], function callback (response) {
// 	response.pipe(bl(function (err, data) { 
// 		resp2 = data.toString();
// 		if (resp1 && resp3){
// 			printall(resp1, resp2, resp3);
// 		}
// 	}))
// });
// http.get(process.argv[4], function callback (response) {
// 	response.pipe(bl(function (err, data) { 
// 		resp3 = data.toString();
// 		if (resp1 && resp2){
// 			printall(resp1, resp2, resp3);
// 		}
// 	}))
// });

//  Time Server
// var net = require('net');
// var strftime = require('strftime'); // not required in browsers
// var server = net.createServer(function callback (socket) {
// 	socket.end(strftime('%Y-%m-%d %H:%M'));
// });
// server.listen(+process.argv[2]);

// HTTP Server
// var http = require('http');
// var fs = require('fs');
// var server = http.createServer(function callback (request, response) {
// 	var readStream = fs.createReadStream(process.argv[3]);
// 	readStream.on('open', function () {
// 		readStream.pipe(response)
// 	});
// });
// server.listen(+process.argv[2]);

// HTTP Uppercase
// var http = require('http');
// var fs = require('fs');
// var map = require('through2-map');
// var server = http.createServer(function callback (request, response) {
// 	request.pipe(map(function (chunk) {  
//        return chunk.toString().toUpperCase()  
//      })).pipe(response)
// });
// server.listen(+process.argv[2]);

// HTTP Json API Server
var http = require('http');
var fs = require('fs');
var map = require('through2-map');
var url = require('url');
var JSON = require('JSON');

var server = http.createServer(function callback (req, res) {
	res.writeHead(200, { 'Content-Type': 'application/json' })
	var returnTime = "";
	var parsed = url.parse(req.url, true);

	if (parsed.pathname === '/api/parsetime'){
		var date = new Date(parsed.query.iso);
		returnTime = {
			"hour": date.getHours(),
			"minute": date.getMinutes(),
			"second": date.getSeconds()
		};
	} else if (parsed.pathname === '/api/unixtime'){
		returnTime = {
			"unixtime": Date.parse(parsed.query.iso)
		};
	}
	res.end(JSON.stringify(returnTime));
});
server.listen(+process.argv[2]);


