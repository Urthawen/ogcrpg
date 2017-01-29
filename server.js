/*Urthawne_test_git*/

var express = require('express');
var app = express();
var server = require('http').Server(app);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/client/index.html');
});

app.use('/client', express.static(__dirname + '/client'));

server.listen(3000);
console.log("server started");

var SOCKET_LIST = {};

var io = require('socket.io')(server,{});
io.sockets.on('connection', function(socket){
  socket.id = Math.random();
  socket.x = 0;
  socket.y = 0;
  socket.player = "Player "+ Math.floor(10 * Math.random());
  SOCKET_LIST[socket.id] = socket;
  console.log('New player : ' + socket.player);

  socket.on('disconnect', function(){
    delete SOCKET_LIST[socket.id];
  });
});

setInterval(function(){
    var pack = [];
    for(var i in SOCKET_LIST){
      var socket = SOCKET_LIST[i];
      socket.x++;
      socket.y++;
      pack.push({
        name:socket.player,
        x:socket.x,
        y:socket.y
      });
    }

    for(var i in SOCKET_LIST){
      var socket = SOCKET_LIST[i];
      socket.emit('newPosition', pack);
    }


},1000/25);
