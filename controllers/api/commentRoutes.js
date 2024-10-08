const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// POST route to add comment
router.post('/comments', withAuth, async (req, res) => {
    try {
      const { content, post_id } = req.body;
  
      // Check if content or post_id is missing
      if (!content || !post_id) {
        return res.status(400).json({ message: 'Comment content and post ID are required.' });
      }
  
      // Ensure the user is logged in
      if (!req.session.user_id) {
        return res.status(401).json({ message: 'Please log in to leave a comment.' });
      }
  
      // Create a new comment
      const newComment = await Comment.create({
        content,
        post_id,
        user_id: req.session.user_id,
      });
  
      res.status(200).json(newComment);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  module.exports = router;