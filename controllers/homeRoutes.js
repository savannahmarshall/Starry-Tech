const router = require('express').Router();
const { Post, User } = require('../models'); //add comment model later when working on comments
const withAuth = require('../utils/auth');

// GET route for the homepage
router.get('/', async (req, res) => {
  try {
    const posts = await Post.findAll();
    res.render('homepage', { posts, logged_in: req.session.logged_in });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching posts', error: err });
  }
});

// Route for the dashboard
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Post }],
    });

    // Check if userData is found
    if (!userData) {
      console.log('User not found for dashboard, redirecting to login.');
      return res.redirect('/login'); 
    }

    const user = userData.get({ plain: true });

    res.render('dashboard', {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    console.error('Error fetching dashboard data:', err);
    res.status(500).json(err);
  }
});

// Route for the login page
router.get('/login', (req, res) => {
  console.log('Login page accessed. Logged in:', req.session.logged_in);
  if (req.session.logged_in) {
    // return res.redirect('/dashboard');
  }
  res.render('login', { logged_in: req.session.logged_in });
});

module.exports = router;