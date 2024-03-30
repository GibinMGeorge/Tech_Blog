const express = require('express');
const router = express.Router();

// Import controllers
const { renderSignUpForm, signUp, renderSignInForm, signIn, logout } = require('../controllers/authController');

// Authentication routes
router.get('/signup', renderSignUpForm);
router.post('/signup', signUp);
router.get('/signin', renderSignInForm);
router.post('/signin', signIn);
router.get('/logout', logout);

module.exports = router;
