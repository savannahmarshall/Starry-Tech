const router = require('express').Router();
const { Comment, User } = require('../../models');
const withAuth = require('../../utils/auth');

// POST route to add a comment
router.post('/', withAuth, async (req, res) => {
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
        console.error(err);
        res.status(500).json({ message: 'Error creating comment', error: err });
    }
});

// GET route to fetch comments by post ID
router.get('/:postId', async (req, res) => {  
    try {
        const postId = req.params.postId;

        // Fetch comments for the given post ID
        const comments = await Comment.findAll({
            where: {
                post_id: postId
            },
            include: [
                {
                    model: User,
                    attributes: ['id', 'username'] 
                }
            ],
            order: [['createdAt', 'DESC']]
        });

        // Return the comments or an empty array if none found
        res.status(200).json(comments);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching comments', error: err });
    }
});

module.exports = router;