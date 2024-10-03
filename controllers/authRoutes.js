const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const withAuth = require('../utils/auth'); 

// POST /login route
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user by username
    const user = await User.findOne({ where: { username } });

    // If user is not found, return an error response
    if (!user) {
      return res.status(400).render('homepage', { errorMessage: 'Invalid username or password' });
    }

    // Check if the password is correct using bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).render('homepage', { errorMessage: 'Invalid username or password' });
    }

    // Create session and log the user in
    req.session.userId = user.id;
    req.session.loggedIn = true; 

    // Redirect to homepage after successful login
    return res.redirect('/'); 
  } catch (err) {
    console.log('Error during login:', err);
    return res.status(500).render('homepage', { errorMessage: 'Internal server error' });
  }
});

// POST /signup route
router.post('/signup', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if all required fields are provided
    if (!username || !password) {
      return res.status(400).render('homepage', { errorMessage: 'All fields are required' });
    }

    // Check if username is already registered
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).render('homepage', { errorMessage: 'Username is already registered' });
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    const newUser = await User.create({ username, password: hashedPassword });

    // Create session and log the user in after signup
    req.session.userId = newUser.id;
    req.session.loggedIn = true; 

    // Redirect to homepage after successful signup
    return res.redirect('/');
  } catch (err) {
    console.log('Error during signup:', err);
    return res.status(500).render('homepage', { errorMessage: 'Internal server error' });
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

module.exports = router;