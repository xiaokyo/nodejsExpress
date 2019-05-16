const socketio = require ('socket.io');

socket = server => {
  const io = socketio.listen (server);
  io.on ('connection', function (socket) {
    // to do somethings
    // let token = socket.handshake.query.accessToken;
    console.log ('connection socket:' + socket.id);

    // // 使用计时器向客户端发送数据
    // setInterval (() => {
    //   socket.emit ('msg', '信息来了');
    // }, 1000);

    socket.on ('disconnect', function () {
      console.log ('user disconnected');
    });

    socket.on ('oneToOne', function (data) {
      console.log (data);
    });
  });
};

module.exports = socket;
