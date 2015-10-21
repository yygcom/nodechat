//app.js
var express = require('express');
var http = require('http');
var path = require('path');
var io = require('socket.io');
var xss = require('xss');

var app = express();

//app.configure(function(){
    app.use(express.static(path.join(__dirname,'./public')));
//});

var server = http.createServer(app);

io = io.listen(server);

server.listen(9999);

var users = [];

io.sockets.on('connection',function(socket){
    console.log('one in');

    
    users[socket.id] = socket;
    console.log(socket.id);

    socket.emit('hello',socket.id+' 欢迎来到一闪福地<br>');


    socket.on('hello',function(data){
	var mydate = new Date();
	data = socket.id+' say: '+data.replace('<','&#60;').replace('>','&#62;')+' <span style="color:#ccc">'+mydate.toLocaleTimeString()+'</span><br>';
        console.log(data);
        socket.emit('hello',data);
    });

    socket.on('pp',function(data){
	var touser = data.touser;
	var data = data.say;
	var mydate = new Date();
	data = socket.id+' say: '+data.replace('<','&#60;').replace('>','&#62;')+' <span style="color:#ccc">'+mydate.toLocaleTimeString()+'</span><br>';
        console.log(data);

        socket.emit('hello',data);
        users[touser].emit('hello',data);
	
    });

});

