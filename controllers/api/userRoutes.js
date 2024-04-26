const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { User } = require('../../models');
const { withAuth } = require('../../utils/auth');

// Sign up
router.post('/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Hashing password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user in the database with hashed password
    const userData = await User.create({
      username,
      email,
      password: hashedPassword
    });

    // Set session and return user data
    req.session.user_id = userData.id;
    req.session.logged_in = true;
    req.session.save(() => {
      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Log in
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find user data from the database
    const userData = await User.findOne({ where: { username } });
    if (!userData || !bcrypt.compareSync(password, userData.password)) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    // Set session and return user ID
    req.session.user_id = userData.id;
    req.session.logged_in = true;
    req.session.save(() => {
      res.status(200).json({ user_id: userData.id, message: 'Login successful.' });
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Logout
router.post('/logout', withAuth, async (req, res) => {
  try {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
