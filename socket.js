/*var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app);
var io = require('socket.io').listen(server);*/
 
var chat = {
	start: function(io){
		/*server.listen(process.env.PORT, process.env.IP, function(){
			console.log('Server started on ' + process.env.PORT + ' port, ' + process.env.IP + ' IP...');
		}); *///8000 before process.env.PORT
		io.set("origins", "*:*");
 
		io.on('connection', function (socket) {         // line 12
			socket.on('newMessage', function (data) {
				socket.emit('chatUpdate',data);
				socket.broadcast.emit('chatUpdate',data);
			});
			socket.on('newUser', function (data) {
				socket.emit('chatUpdate',
					{'userName':'','text':data.username+' has entered the room','roomId':data.roomId, 'usrN':data.username});
				socket.broadcast.emit('chatUpdate',
					{'userName':'','text':data.username+' has entered the room','roomId':data.roomId, 'usrN':data.username});
			});
			socket.on('userLeft', function (data) {
				socket.emit('chatUpdate',data);
				socket.broadcast.emit('chatUpdate',data);
			});
		});	
	}
}
 
module.exports = chat;