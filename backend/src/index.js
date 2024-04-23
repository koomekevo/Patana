const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const cors = require("cors");
const connectDB = require("./utils/db");
const initializeSocketIO = require("./utils/socket");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");

// Initialize Express app
const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
connectDB();

// Set up routes
app.use("/api/users", userRoutes);
app.use("/api/chat", chatRoutes);

// Set up HTTP server
const server = http.createServer(app);

// Initialize socket.io
const io = initializeSocketIO(server);

// Socket.io event listeners
io.on("connection", (socket) => {
  console.log("A client connected:", socket.id);

  // Handle disconnect event
  socket.on("disconnect", () => {
    console.log("A client disconnected:", socket.id);
  });

  // Add more event handlers as needed
});

// Define server port
const PORT = process.env.PORT || 5000;

// Start server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
