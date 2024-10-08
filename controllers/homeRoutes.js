const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

// Route for the homepage
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        { 
          model: User, 
          attributes: ['id', 'username'] 
        },
        { 
          model: Comment,
          include: [
            {
              model: User,
              attributes: ['username']
            }
          ]
        }
      ],
      order: [['createdAt', 'DESC']] 
    });
    
    const posts = postData.map(post => {
      const plainPost = post.get({ plain: true });
      
      // Format the createdAt date
      plainPost.createdAt = new Date(plainPost.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });

      // Format comments
      plainPost.comments = plainPost.comments.map(comment => {
        return {
          ...comment,
          createdAt: new Date(comment.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })
        };
      });

      return plainPost;
    });

    // Render homepage with formatted posts and comments
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

// Route for fetching comments for a specific post
router.get('/comments/:post_id', async (req, res) => {
  try {
    const commentsData = await Comment.findAll({
      where: {
        post_id: req.params.post_id
      },
      include: [
        {
          model: User,
          attributes: ['id', 'username']
        }
      ],
      order: [['createdAt', 'DESC']] 
    });

    const comments = commentsData.map(comment => comment.get({ plain: true }));

    res.status(200).json(comments); 
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching comments', error: err });
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