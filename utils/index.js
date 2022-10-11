const hashPassword = require('../utils/hashPassword');
const sendVerificationEmail = require('../utils/sendVerificationEmail');
const comparePassword = require('./comparePassword');
const createTokenUser = require('./createTokenUser');
const { createJWT, isTokenValid, attachCookiesToResponse } = require('./jwt');

module.exports = {
  hashPassword,
  sendVerificationEmail,
  comparePassword,
  createTokenUser,
  createJWT,
  attachCookiesToResponse,
  isTokenValid,
};
