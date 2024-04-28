const { Comment } = require('../models/');

const commentData = [
  {
    text: "Seed Comment 1. What Colour is Your Mustang ?",
    userId: "1",
    postId: "1"
  },
  {
    text: "Seed Comment 2. i can see you....",
    userId: "2",
    postId: "2"
  }
]

const seedComment = () => Comment.bulkCreate(commentData);

module.exports = seedComment;