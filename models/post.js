const Sequelize = require('sequelize');

const sequelize = require('../db/connectDB');

const Post = sequelize.define('posts', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: [1, 200],
    },
  },
  image: {
    type: Sequelize.STRING,
  },
  likes: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  university_id: {
    type: Sequelize.UUID,
    allowNull: false,
    references: {
      model: 'universities',
      key: 'id',
    },
  },
  user_id: {
    type: Sequelize.UUID,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
    },
  },
});

module.exports = Post;
