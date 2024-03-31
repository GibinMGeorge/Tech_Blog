const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Assuming you have a configured instance of Sequelize

const BlogPost = sequelize.define('BlogPost', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    }
});

module.exports = BlogPost;
