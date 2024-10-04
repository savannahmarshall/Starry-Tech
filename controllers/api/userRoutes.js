const router = require('express').Router();
const { User } = require('../../models');
const bcrypt = require('bcrypt');
// const withAuth = require('../utils/auth'); 


router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

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
    req.session.user_id = newUser.id;
    req.session.logged_in = true; 

    // Redirect to the dashboard after successful signup
    return res.redirect('/dashboard'); 
  } catch (err) {
    console.log('Error during signup:', err);
    return res.status(500).json({ errorMessage: 'Internal server error' });
  }
});



// POST route for login
router.post('/login', async (req, res) => {
  try {
    console.log('Login attempt with username:', req.body.username);
    const userData = await User.findOne({ where: { username: req.body.username } });

    if (!userData) {
      console.log('User not found');
      return res.status(401).json({ message: 'Incorrect username or password. Please try again.' });
    }

    const validPassword = await bcrypt.compare(req.body.password, userData.password);
    if (!validPassword) {
      console.log('Invalid password');
      return res.status(401).json({ message: 'Incorrect username or password. Please try again.' });
    }

    req.session.user_id = userData.id;
    req.session.logged_in = true;

    console.log('Login successful, redirecting to dashboard');
    return res.redirect('/dashboard');
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ message: 'Server error', error: err });
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end(); 
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;

