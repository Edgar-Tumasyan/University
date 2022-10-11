const express = require('express');
const { checkPermission, authenticateUser } = require('../middleware/index');

const router = express.Router();

const {
  register,
  login,
  logout,
  verifyEmail,
  deleteAccount,
} = require('../controller/auth');

router.route('/register').post(register);
router.route('/login').post(checkPermission, login);
router.route('/logout').delete(authenticateUser, logout);
router.route('/verify-email').post(checkPermission, verifyEmail);
router.route('/account/:id').delete(authenticateUser, deleteAccount);

module.exports = router;
