const express = require('express');
const router = express.Router();
const withAuth = require('../utils/auth'); 


// route for dashboard 
router.get('/dashboard', withAuth, (req, res) => {
    res.render('dashboard'); 
});

module.exports = router;