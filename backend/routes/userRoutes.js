const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Secret key for JWT
const JWT_SECRET = 'Sanjaisuga@43';

// Middleware to check if the user is authenticated
const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(403).json({ message: "Access Denied" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);  // Verify the JWT
    req.user = decoded;  // Attach user info to the request
    next();
  } catch (err) {
    return res.status(400).json({ message: "Invalid Token" });
  }
};

// User registration
router.post('/register', async (req, res) => {
  const { name, email, password, address } = req.body;

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new User({
    name,
    email,
    password: hashedPassword,
    address
  });

  try {
    const savedUser = await newUser.save();
    const token = jwt.sign({ userId: savedUser._id }, JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ token });  // Return the JWT token
  } catch (err) {
    res.status(500).json({ message: 'Error registering user', error: err });
  }
});

// Get user profile
router.get('/profile', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);  // Return user profile
  } catch (err) {
    res.status(500).json({ message: 'Error fetching user profile', error: err });
  }
});

// Update user details
router.put('/update', verifyToken, async (req, res) => {
  const { name, email, address } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user.userId,
      { name, email, address },
      { new: true }
    );
    res.json(updatedUser);  // Return updated user
  } catch (err) {
    res.status(500).json({ message: 'Error updating user', error: err });
  }
});

// Delete user account
router.delete('/delete', verifyToken, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user.userId);
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting user', error: err });
  }
});

module.exports = router;
