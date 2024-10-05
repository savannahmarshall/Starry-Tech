const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});



// Get all posts for the homepage
router.get('/', async (req, res) => {
    try {
        const posts = await Post.findAll(); 
        res.render('homepage', { posts }); 
    } catch (err) {
        res.status(500).json({ message: 'Error fetching posts', error: err });
    }
});

// Get single post 
router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.id); 
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.render('post', { post }); 
    } catch (err) {
        res.status(500).json({ message: 'Error fetching post', error: err });
    }
});

// Create new post
router.post('/', async (req, res) => {
    try {
        const { title, content } = req.body;
        const newPost = await Post.create({ title, content, userId: req.session.userId });
        res.redirect('/dashboard');
    } catch (err) {
        res.status(500).json({ message: 'Error creating post', error: err });
    }
});

// Update post
router.put('/:id', async (req, res) => {
    try {
        const { title, content } = req.body;
        await Post.update({ title, content }, { where: { id: req.params.id } });
        res.redirect('/dashboard'); 
    } catch (err) {
        res.status(500).json({ message: 'Error updating post', error: err });
    }
});

// Delete post
router.delete('/:id', async (req, res) => {
    try {
        await Post.destroy({ where: { id: req.params.id } });
        res.redirect('/dashboard');
    } catch (err) {
        res.status(500).json({ message: 'Error deleting post', error: err });
    }
});

module.exports = router;

