const Sequelize = require('sequelize');

const sequelize = require('../db/connectDB');

const Student = sequelize.define('students', {
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
});

module.exports = Student;
