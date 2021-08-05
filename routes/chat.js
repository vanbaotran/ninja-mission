const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  console.log("in router")
  // req.io.on("connection", function (socket) {
  //   console.log(socket.id);

  //   socket.on("join-room", (room) => {
  //     console.log(room);
  //     socket.join(room);
  //     req.io.to(room).emit("receiveMessageFromOther", "salut par la! from room" + room);
  //     socket.on("sendMessage", (mess) => {
  //       req.io.to(room).emit("receiveMessageFromOther", "salut par la!" + mess);
  //     });
  //   });
  // });
});
module.exports = router;
