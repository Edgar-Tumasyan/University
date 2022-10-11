const Sequelize = require('sequelize');

const sequelize = require('../db/connectDB');

const Like = sequelize.define('likes', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  user_id: {
    type: Sequelize.UUID,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
    },
  },
  post_id: {
    type: Sequelize.UUID,
    allowNull: false,
    references: {
      model: 'posts',
      key: 'id',
    },
  },
});

module.exports = Like;
