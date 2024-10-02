const router = require('express').Router();
const { Comment } = require('../models');

// Add comment
router.post('/', async (req, res) => {
    const { postId, content } = req.body; 
    try {
        if (!postId || isNaN(postId)) {
            return res.status(400).send('Invalid post ID');
        }

        // Create a new comment
        await Comment.create({ content, postId, userId: req.session.userId });
        res.redirect(`/posts/${postId}`); 
    } catch (error) {
        console.error('Error adding comment:', error);
        res.status(500).send('Server error');
    }
});

module.exports = router;