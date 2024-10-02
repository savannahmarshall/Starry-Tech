const express = require('express');
const router = express.Router();
const { User } = require('../models/user');
const bcrypt = require('bcrypt');

// POST /login route
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user by username
    const user = await User.findOne({ where: { username } });

    // If user is not found, return an error response
    if (!user) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    // Check if the password is correct
    const isPasswordValid = user.checkPassword(password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    req.session.userId = user.id; 
    return res.status(200).json({ message: 'Login successful', user });
  } catch (err) {
    console.log('Error during login:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// POST /signup route
router.post('/signup', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ message: 'Username is already registered' });
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 8); 
    const newUser = await User.create({ username, password: hashedPassword });

    return res.status(201).json({ message: 'Signup successful', user: newUser });
  } catch (err) {
    console.log('Error during signup:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;