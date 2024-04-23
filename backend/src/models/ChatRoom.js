const mongoose = require("mongoose");

// Define the chat room schema
const chatRoomSchema = new mongoose.Schema(
  {
    roomId: {
      type: String,
      required: true,
      unique: true,
    },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    // You can add more fields as per your application requirements
  },
  { timestamps: true }
);

// Create and export the ChatRoom model
const ChatRoom = mongoose.model("ChatRoom", chatRoomSchema);
module.exports = ChatRoom;
