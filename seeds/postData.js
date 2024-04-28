const { Post } = require('../models/');

const postData = [
  {
    title: "Seed Title 1.",
    text: "Seed Text 1. hii how are you ?",
    userId: "1"
  },
  {
    title: "Seed Title 2",
    text: "Seed Text 2. I'm Okay",
    userId: "2"
  }
]

const seedPost = () => Post.bulkCreate(postData);

module.exports = seedPost;