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

    socket.on("delete-msg", (data) => {
      let sendUserId = global.onlineUsers.get(data.userId);
      if (sendUserId) socket.to(sendUserId).emit("delete-data", data);
    });

    socket.on("edit-message", (data) => {
      let sendUserId = global.onlineUsers.get(data.userId);
      if (sendUserId) socket.to(sendUserId).emit("edit-data", data);
    });
  });
};

module.exports = connectSocket;
