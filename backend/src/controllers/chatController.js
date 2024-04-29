const Chat = require("../models/Chat");

// Create a new chat
exports.createChat = async (req, res) => {
  try {
    const { participants } = req.body;
    const existingChat = await Chat.findOne({ participants });

    if (existingChat) {
      return res.status(400).json({ message: "Chat already exists" });
    }

    const newChat = new Chat({
      participants,
    });

    await newChat.save();

    return res
      .status(201)
      .json({ message: "Chat created successfully", chat: newChat });
  } catch (error) {
    console.error("Error creating chat:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Get chats for a specific user
exports.getChatsByUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const chats = await Chat.find({ participants: userId }).populate(
      "participants"
    );

    return res.status(200).json({ chats });
  } catch (error) {
    console.error("Error getting chats:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Send a message to a chat
exports.sendMessage = async (req, res) => {
  try {
    const { chatId, sender, message } = req.body;
    const chat = await Chat.findById(chatId);

    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    chat.messages.push({ sender, message });
    await chat.save();

    return res.status(200).json({ message: "Message sent successfully", chat });
  } catch (error) {
    console.error("Error sending message:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
