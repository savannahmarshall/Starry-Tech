const express = require('express');
const router = express.Router();
const User = require('../models/user'); // Adjust the path as necessary
const sequelize = require('sequelize');

// POST /login route
router.post('/login', async (req, res) => {
  try {
    // Destructure username and password from the request body
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

    // If login is successful, proceed with creating a session or sending a success response
    req.session.userId = user.id; // or however you handle sessions
    return res.status(200).json({ message: 'Login successful', user });
  } catch (err) {
    console.log('Error during login:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// POST /signup route
router.post('/signup', async (req, res) => {
  try {
    // Destructure username and password from the request body
    const { username, password } = req.body;

    // Check if all fields are provided
    if (!username || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if the username already exists
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ message: 'Username is already registered' });
    }

    // Create a new user
    const newUser = await User.create({ username, password });

    // If signup is successful, send a success response
    return res.status(201).json({ message: 'Signup successful', user: newUser });
  } catch (err) {
    console.log('Error during signup:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;