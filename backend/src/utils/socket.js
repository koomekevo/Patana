const socketIo = require("socket.io");

// Function to initialize socket.io
const initializeSocketIO = (server) => {
  // Create a socket.io instance
  const io = socketIo(server);

  // Socket.io event listeners
  io.on("connection", (socket) => {
    console.log("A client connected:", socket.id);

    // Handle disconnect event
    socket.on("disconnect", () => {
      console.log("A client disconnected:", socket.id);
    });

    // Add more event handlers as needed
  });

  return io;
};

module.exports = initializeSocketIO;
