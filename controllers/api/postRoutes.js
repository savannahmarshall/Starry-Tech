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

// Delete post using DELETE method
router.delete('/:id', async (req, res) => {
  try {
      const result = await Post.destroy({ where: { id: req.params.id } });

      if (!result) {
          return res.status(404).json({ message: 'No post found with this id!' });
      }

      res.status(204).send(); 
  } catch (err) {
      res.status(500).json({ message: 'Error deleting post', error: err });
  }
});

// Update a post using PUT method
router.put('/:id', async (req, res) => {
  try {
    const { title, content } = req.body;
    const result = await Post.update(
        { title, content },
        { where: { id: req.params.id } }
    );

    if (result[0] === 0) {
        return res.status(404).json({ message: 'No post found with this id!' });
    }

    res.status(204).send();
} catch (err) {
    res.status(500).json({ message: 'Error updating post', error: err });
}
});



// // Get all posts for the homepage
// router.get('/', async (req, res) => {
//     try {
//         const posts = await Post.findAll(); 
//         res.render('homepage', { posts }); 
//     } catch (err) {
//         res.status(500).json({ message: 'Error fetching posts', error: err });
//     }
// });


module.exports = router;

