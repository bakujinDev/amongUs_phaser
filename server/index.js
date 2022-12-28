const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http, {
  cors: {
    origins: ["http://localhost:8080"],
  },
});

io.on("connection", (socket) => {
  const room = socket.handshake.query.room;

  socket.join(room);
  io.to(room).emit("playerJoined");
  console.log(`player connected at ${room}`);

  socket.on("disconnect", () => {
    console.log("player disconnected");
  });

  socket.on("move", ({ x, y }) => {
    socket.broadcast.to(room).emit("move", { x, y });
  });

  socket.on("moveEnd", () => {
    socket.broadcast.to(room).emit("moveEnd");
  });
});

http.listen(3000, () => {
  console.log("server listing on localhost:3000");
});
