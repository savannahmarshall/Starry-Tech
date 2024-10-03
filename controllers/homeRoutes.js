const router = require('express').Router();
const { Post, User } = require('../models');
const withAuth = require('../utils/auth');
const bcrypt = require('bcrypt'); // Ensure bcrypt is installed for password hashing

// GET route for the homepage
router.get('/', async (req, res) => {
  try {
    const posts = await Post.findAll();
    res.render('homepage', { posts, logged_in: req.session.logged_in });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching posts', error: err });
  }
});

// Route for the dashboard, protected by withAuth middleware
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Post }],
    });

    const user = userData.get({ plain: true });

    // Render the dashboard with user data
    res.render('dashboard', {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route for the login page
router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to the dashboard
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  // Render the login page
  res.render('login');
});


module.exports = router;