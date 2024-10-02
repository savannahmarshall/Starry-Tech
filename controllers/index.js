const express = require('express');
const authRoutes = require('./authRoutes');
const postRoutes = require('./postRoutes');
const commentRoutes = require('./commentRoutes');
const dashboardRoutes = require('./dashboardRoutes'); 

const router = express.Router(); 

// Use the imported routes
router.use(authRoutes);
router.use(postRoutes);
router.use(commentRoutes);
router.use(dashboardRoutes); 

module.exports = router; 