const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Assuming you have a configured instance of Sequelize

const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = User;
