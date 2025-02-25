const {sql} = require("../dbConnection");

exports.createUser = async (newUser) => {
    const [user] = await sql`
    INSERT INTO users ${sql(newUser, `username`, `email`, `password`, `role`)}
    RETURNING *
    `;
    return user;
};

exports.getUserByEmail = async (email) => {
    const [user] = await sql`
    SELECT users.*
    FROM users
    WHERE users.email = ${email}
    `;
    return user;
};

exports.getUserById = async (id) => {
    const [user] = await sql`
    SELECT users.*
    FROM users
    WHERE users.id = ${id}
    `;
    return user;
};

const { DataTypes } = require('sequelize');
const sequelize = require('./dbConnection'); // Import the Sequelize instance

const Post = sequelize.define('Post', {
  // Define attributes
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  // Model options
  tableName: 'posts', // Custom table name
  timestamps: true, // Adds createdAt and updatedAt
});

module.exports = Post;