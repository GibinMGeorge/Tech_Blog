const { User } = require('../models/');

const userData = [
  {
    username: "Wolverine",
    email: "wolverine123@xyz.com",
    password: "dummy2"
  },
  {
    username: "spidey_123",
    email: "spider.man@spy.com",
    password: "dummy3"
  }
]

const seedUser = () => User.bulkCreate(userData);

module.exports = seedUser;