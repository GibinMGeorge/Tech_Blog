const express = require('express');
const router = express.Router();

// Import controllers
const { renderDashboard, createBlogPostForm, createBlogPost, viewBlogPost, addComment } = require('../controllers/blogController');

// Blog routes
router.get('/dashboard', renderDashboard);
router.get('/post/new', createBlogPostForm);
router.post('/post/new', createBlogPost);
router.get('/post/:id', viewBlogPost);
router.post('/post/:id/comment', addComment);

module.exports = router;
