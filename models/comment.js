const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Assuming you have a configured instance of Sequelize

const Comment = sequelize.define('Comment', {
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    }
});

module.exports = Comment;
