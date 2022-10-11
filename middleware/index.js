const {
  checkPermission,
  authenticateUser,
  isAdmin,
} = require('./authentication');

const existingStudent = require('./existingStudent');
const existingUniversity = require('./existingUniversity');
const findPost = require('./findPost');
const reqValues = require('./requestValues');

module.exports = {
  checkPermission,
  authenticateUser,
  isAdmin,
  existingStudent,
  existingUniversity,
  findPost,
  reqValues,
};
