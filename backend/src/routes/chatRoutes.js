const express = require("express");
const router = express.Router();
const {
  initiateVideoChat,
  joinVideoChat,
} = require("../controllers/videoChatController");

// Route to initiate a new video chat room
router.post("/initiate", initiateVideoChat);

// Route to join an existing video chat room
router.post("/join/:roomId", joinVideoChat);

module.exports = router;
