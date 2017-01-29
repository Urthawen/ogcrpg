var socket = io();
var ctx = document.getElementById('ctx').getContext("2d");
ctx.font = '15px Arial';

socket.on('newPosition', function(data){
  ctx.clearRect(0,0,500,500);
  for(var i = 0 ; i<data.length ; i++){
    ctx.fillText(data[i].name, data[i].x, data[i].y);
  }
});
