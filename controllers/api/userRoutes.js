const router = require('express').Router();
const { User } = require('../../models');

// POST route for user signup
router.post('/signup', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if all required fields are provided
    if (!username || !password) {
      return res.status(400).json({ errorMessage: 'All fields are required' });
    }

    // Check if the username is already registered
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ errorMessage: 'Username is already registered' });
    }

    // Create the new user (password hashing happens in the model)
    const newUser = await User.create({ username, password });

    // Create session and log the user in after signup
    req.session.user_id = newUser.id;
    req.session.logged_in = true;

    // Redirect to the dashboard after successful signup
    return res.redirect('/dashboard');
  } catch (err) {
    console.log('Error during signup:', err);
    return res.status(500).json({ errorMessage: 'Internal server error' });
  }
});

// POST route for user login
router.post('/login', async (req, res) => {
  try {
    // Validate input
    if (!req.body.username || !req.body.password) {
      return res.status(400).json({ message: 'Username and password are required.' });
    }

    // Attempt to find the user by username
    const userData = await User.findOne({ where: { username: req.body.username } });

    // Check if user is found
    if (!userData) {
      return res.status(401).json({ message: 'Incorrect username or password. Please try again.' });
    }

    // Compare the password
    const validPassword = await userData.checkPassword(req.body.password);
    if (!validPassword) {
      return res.status(401).json({ message: 'Incorrect username or password. Please try again.' });
    }

    // Set session variables if authentication is successful
    req.session.user_id = userData.id;
    req.session.logged_in = true;

    return res.status(200).json({ message: 'Login successful!' });
  } catch (err) {
    return res.status(500).json({ message: 'Server error', error: err });
  }
});

// POST route for user logout
router.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ message: 'Error logging out' });
    }
    res.status(200).json({ message: 'Logout successful' });
  });
});

module.exports = router;

