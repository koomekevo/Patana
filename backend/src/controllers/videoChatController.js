// Import necessary modules
const { v4: uuidv4 } = require("uuid");

// Import models
const ChatRoom = require("../models/ChatRoom");

// Function to initiate a new video chat room
const initiateVideoChat = async (req, res) => {
  try {
    // Generate a unique room ID
    const roomId = uuidv4();

    // Create a new chat room in the database
    const newChatRoom = new ChatRoom({
      roomId,
      users: [req.body.userId], // Assuming userId is sent in the request body
    });
    await newChatRoom.save();

    // Respond with the room ID
    res.status(200).json({ roomId });
  } catch (error) {
    console.error("Error initiating video chat:", error);
    res.status(500).json({ error: "Failed to initiate video chat" });
  }
};

// Function to join an existing video chat room
const joinVideoChat = async (req, res) => {
  try {
    const { roomId } = req.params;
    const { userId } = req.body;

    // Find the chat room with the given room ID
    const chatRoom = await ChatRoom.findOne({ roomId });

    // If the room doesn't exist, return an error
    if (!chatRoom) {
      return res.status(404).json({ error: "Room not found" });
    }

    // Add the user to the chat room
    chatRoom.users.push(userId); // Assuming userId is sent in the request body
    await chatRoom.save();

    // Respond with success
    res.status(200).json({ message: "Joined video chat successfully" });
  } catch (error) {
    console.error("Error joining video chat:", error);
    res.status(500).json({ error: "Failed to join video chat" });
  }
};

// Export controller functions
module.exports = {
  initiateVideoChat,
  joinVideoChat,
};
