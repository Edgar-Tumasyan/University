const Sequelize = require('sequelize');

const sequelize = require('../db/connectDB');

const University = sequelize.define('universities', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  logo: {
    type: Sequelize.STRING,
  },
  count_of_posts: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
});

module.exports = University;
