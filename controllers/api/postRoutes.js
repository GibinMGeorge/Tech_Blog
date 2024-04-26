const express = require('express');
const router = express.Router();
const { withAuth } = require('../../utils/auth');
const { Post } = require('../../models');

// Create new post
router.post('/new', withAuth, async (req, res) => {
  try {
    const { title, text } = req.body;
    const newPost = await Post.create({
      title,
      text,
      userId: req.session.user_id
    });
    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Delete post by id
router.delete('/delete/:id', withAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const postDelete = await Post.destroy({
      where: { id }
    });
  
    if (!postDelete) {
      return res.status(404).json({ message: 'No posts found!' });
    }

    res.status(200).json(postDelete);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Update post by id
router.put('/update/:id', withAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, text } = req.body;
    const updatedPost = await Post.update(
      { title, text },
      { where: { id } }
    );

    if (!updatedPost[0]) {
      return res.status(404).json({ message: 'No posts found!' });
    }

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
