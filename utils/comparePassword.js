const bcrypt = require('bcrypt');

const comparePassword = (canditatePassword, hashPassword) => {
  return bcrypt.compare(canditatePassword, hashPassword);
};

module.exports = comparePassword;
