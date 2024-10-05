const router = require('express').Router();
const { User } = require('../../models');
const bcrypt = require('bcrypt');

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
    // Validate input
    if (!req.body.username || !req.body.password) {
      return res.status(400).json({ message: 'Username and password are required.' });
    }
    
    // Attempt to find the user by username
    const userData = await User.findOne({ where: { username: req.body.username } });

    // Check if userData is found
    if (!userData) {
      return res.status(401).json({ message: 'Incorrect username or password. Please try again.' });
    }

    // Compare the password
    const validPassword = await bcrypt.compareSync(req.body.password, userData.password);
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

// POST Route for logout
router.post('/logout', (req, res) => {
  req.session.destroy(err => {
      if (err) {
          return res.status(500).json({ message: 'Error logging out' });
      }
      res.status(200).json({ message: 'Logout successful' });
  });
});

module.exports = router;

