const express = require("express");
const AuthCtrl = require("../controllers/UserController");
const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();

// Registration route
router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, hashedPassword });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});

// Login route
router.post("/login", AuthCtrl.userLogin);

module.exports = router;