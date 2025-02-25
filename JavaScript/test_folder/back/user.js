const { DataTypes } = require('sequelize');
const sequelize = require('./dbConnection');  // Import the Sequelize instance

const User = sequelize.define('User', {
  // Define attributes
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
}, {
  // Model options
  tableName: 'users',  // Custom table name
  timestamps: true,    // Adds createdAt and updatedAt
});

module.exports = User;
