const router = require('express').Router();
const withAuth = require('../../utils/auth');
const { Comment } = require('../../models');

// Post new comment
router.post('/new', withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      userId: req.session.user_id,
      postId: req.body.postId,
      text: req.body.comment
    });
    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
