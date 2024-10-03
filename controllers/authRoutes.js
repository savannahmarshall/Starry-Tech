const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const withAuth = require('../utils/auth'); 

// POST /signup route
router.post('/signup', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if all required fields are provided
    if (!username || !password) {
      return res.status(400).json({ errorMessage: 'All fields are required' });
    }

    // Check if username is already registered
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ errorMessage: 'Username is already registered' });
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    const newUser = await User.create({ username, password: hashedPassword });

    // Create session and log the user in after signup
    req.session.userId = newUser.id;
    req.session.loggedIn = true; 

    // Return success response
    return res.json({ success: true, message: 'Signup successful!' });
  } catch (err) {
    console.log('Error during signup:', err);
    return res.status(500).json({ errorMessage: 'Internal server error' });
  }
});

// POST /login route
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate inputs
    if (!username || !password) {
      return res.status(400).json({ errorMessage: 'Username and password are required.' });
    }

    // Find the user by username
    const user = await User.findOne({ where: { username } });
    console.log('User found:', user); // Log the user object

    // If user is not found, return an error response
    if (!user) {
      console.log('No user found with that username.');
      return res.status(400).json({ errorMessage: 'Invalid username or password.' });
    }

    // Log the password being attempted
    console.log('Attempting to log in with password:', password);

    // Check if the password is correct using bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log('Password valid:', isPasswordValid); 

    if (!isPasswordValid) {
      console.log('Password does not match.');
      return res.status(400).json({ errorMessage: 'Invalid username or password.' });
    }

    // Create session and log the user in
    req.session.userId = user.id;
    req.session.loggedIn = true;

    // Return success response
    return res.json({ success: true, message: 'Login successful!' });
  } catch (err) {
    console.error('Error during login:', err);
    return res.status(500).json({ errorMessage: 'Internal server error.' });
  }
});

// Use the authentication middleware for the dashboard route
router.get('/dashboard', withAuth, (req, res) => {
  res.render('dashboard', { posts: [] }); 
});

// Add a logout route
router.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.log('Error during logout:', err);
      return res.status(500).render('homepage', { errorMessage: 'Internal server error' });
    }
    res.redirect('/'); 
  });
});

module.exports = router;;