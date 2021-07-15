const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

io.on("connection", socket => {
  socket.on('message', ({ userName, message }) => {
    io.emit('message', { userName, message });
  });
});
http.listen(5001, function () {
  console.log("server listen on 5001");
})