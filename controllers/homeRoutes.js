const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');


router.get('/', async (req, res) => {
  try {
      const postData = await Post.findAll({
          include: [
              { model: User, attributes: ['id', 'username'] }
          ],
          order: [['createdAt', 'DESC']]
      });
      
      const posts = postData.map(post => post.get({ plain: true }));
      console.log(posts); 
      res.render('homepage', { posts, logged_in: req.session.logged_in || false });
  } catch (err) {
      console.error(err); 
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

    const user = userData.get({ plain: true });

    res.render('dashboard', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


// Route for the login page
router.get('/login', (req, res) => {
  console.log('Login page accessed. Logged in:', req.session.logged_in);
  if (req.session.logged_in) {
    return res.redirect('/dashboard'); 
  }
  res.render('login', { logged_in: req.session.logged_in });
});

module.exports = router;