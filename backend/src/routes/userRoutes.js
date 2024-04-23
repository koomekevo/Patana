const express = require("express");
const router = express.Router();
const {
  registerUser,
  authenticateUser,
} = require("../controllers/userController");

// Route to register a new user
router.post("/register", registerUser);

// Route to authenticate a user
router.post("/login", authenticateUser);

module.exports = router;
