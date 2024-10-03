// const router = require('express').Router();
// const { Project } = require('../../models');
// const withAuth = require('../../utils/auth');

// router.post('/', withAuth, async (req, res) => {
//   try {
//     const newProject = await Project.create({
//       ...req.body,
//       user_id: req.session.user_id,
//     });

//     res.status(200).json(newProject);
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });

// router.delete('/:id', withAuth, async (req, res) => {
//   try {
//     const projectData = await Project.destroy({
//       where: {
//         id: req.params.id,
//         user_id: req.session.user_id,
//       },
//     });

//     if (!projectData) {
//       res.status(404).json({ message: 'No project found with this id!' });
//       return;
//     }

//     res.status(200).json(projectData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// module.exports = router;


// st router = require('express').Router();
// const { Post } = require('../models');

// // Route for the dashboard 
// router.get('/dashboard', (req, res) => {
//     res.render('dashboard'); 
// });

// // Route for the login page
// router.get('/login', (req, res) => {
//     res.render('login'); 
// });

// // Get all posts for the homepage
// router.get('/', async (req, res) => {
//     try {
//         const posts = await Post.findAll(); 
//         res.render('homepage', { posts }); 
//     } catch (err) {
//         res.status(500).json({ message: 'Error fetching posts', error: err });
//     }
// });

// // Get single post 
// router.get('/:id', async (req, res) => {
//     try {
//         const post = await Post.findByPk(req.params.id); 
//         if (!post) {
//             return res.status(404).json({ message: 'Post not found' });
//         }
//         res.render('post', { post }); 
//     } catch (err) {
//         res.status(500).json({ message: 'Error fetching post', error: err });
//     }
// });

// // Create new post
// router.post('/', async (req, res) => {
//     try {
//         const { title, content } = req.body;
//         const newPost = await Post.create({ title, content, userId: req.session.userId });
//         res.redirect('/dashboard');
//     } catch (err) {
//         res.status(500).json({ message: 'Error creating post', error: err });
//     }
// });

// // Update post
// router.put('/:id', async (req, res) => {
//     try {
//         const { title, content } = req.body;
//         await Post.update({ title, content }, { where: { id: req.params.id } });
//         res.redirect('/dashboard'); 
//     } catch (err) {
//         res.status(500).json({ message: 'Error updating post', error: err });
//     }
// });

// // Delete post
// router.delete('/:id', async (req, res) => {
//     try {
//         await Post.destroy({ where: { id: req.params.id } });
//         res.redirect('/dashboard');
//     } catch (err) {
//         res.status(500).json({ message: 'Error deleting post', error: err });
//     }
// });

// module.exports = router;

