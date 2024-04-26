const express = require('express');
const router = express.Router();
const { renderSignInForm, signIn, renderSignUpForm, signUp } = require('../controllers/authController');

// Render login form
router.get('/login', renderSignInForm);
// Handle login form submission
router.post('/login', signIn);

// Render signup form
router.get('/signup', renderSignUpForm);
// Handle signup form submission
router.post('/signup', signUp);

module.exports = router;
