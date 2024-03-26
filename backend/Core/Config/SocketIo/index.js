const connectSocket = (io) => {
  global.onlineUsers = new Map();

  io.on("connection", (socket) => {
    socket.on("add-user", (userId) => {
      global.onlineUsers.set(userId, socket.id);
    });
    socket.on("send-message", (data) => {
      let sendUserId = global.onlineUsers.get(data.recieverId);
      if (sendUserId) socket.to(sendUserId).emit("receive-message", data);
    });
  });
};

module.exports = connectSocket;
