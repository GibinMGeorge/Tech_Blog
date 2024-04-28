const router = require('express').Router();
const withAuth = require('../../utils/auth');
const { Post } = require('../../models');


// Create new post
router.post('/new', withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      title: req.body.title,
      text: req.body.text,
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
    const postDelete = await Post.destroy({
      where: {
        id: req.params.id
      }
    })
  
    if (!postDelete) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(postDelete);
  } catch (err) {
    res.status(400).json(err);
  }
})

// Update post by id
router.put('/update/:id', withAuth, async (req, res) => {
  try {
    console.log(`-----------${req.params.id}----------`)
    const postDelete = await Post.update({
      title: req.body.title,
      text: req.body.text
    }, {
      where: {
        id: req.params.id
      }
    })
  
    if (!postDelete) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(postDelete);
  } catch (err) {
    res.status(400).json(err);
  }
})

module.exports = router;