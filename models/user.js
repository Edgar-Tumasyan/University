const Sequelize = require('sequelize');

const sequelize = require('../db/connectDB');

const User = sequelize.define(
  'users',
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    firstname: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    lastname: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true, // not worked
      },
    },
    birthdate: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    university_id: {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: 'universities',
        key: 'id',
      },
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    isverified: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    role: {
      type: Sequelize.ENUM,
      values: ['admin', 'user'],
      defaultValue: 'user',
      allowNull: false,
    },
    verificationtoken: {
      type: Sequelize.STRING,
    },

    deletedAt: {
      type: Sequelize.ENUM,
      values: ['active', 'inactive'],
      defaultValue: 'active',
      allowNull: false,
    },
  },
  { timestamps: true }
);

module.exports = User;
