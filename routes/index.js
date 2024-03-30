const express = require('express');
const router = express.Router();

// Import controllers
const { renderHomePage } = require('../controllers/blogController');

// Homepage route
router.get('/', renderHomePage);

module.exports = router;
