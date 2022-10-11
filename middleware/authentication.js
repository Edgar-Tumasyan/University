const { isTokenValid } = require('../utils');
const { StatusCodes } = require('http-status-codes');
const { User } = require('../models/index');

const checkPermission = async (req, res, next) => {
  // in realy email and verificationToken coming in req.query
  // now this values coming with req.body only for testing
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ msg: 'Please provide email' }); // change msg
  }

  const [existingEmail] = await User.findAll({ where: { email } });

  if (!existingEmail) {
    return res.status(401).json({ msg: 'Verification failed' });
  }

  req.user = existingEmail.dataValues;

  next();
};

const authenticateUser = async (req, res, next) => {
  const { accessToken } = req.signedCookies;

  if (accessToken) {
    const payload = isTokenValid(accessToken);

    req.user = payload.user;

    const [activeUser] = await User.findAll({
      where: { deletedAt: 'active', id: req.user.userId },
    });

    if (!activeUser) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ msg: `User with id: ${req.user.userId} does not exists` });
    }

    return next();
  }
  return res.status(401).json({ msg: 'Authentication Invalid' });
};

const isAdmin = async (req, res, next) => {
  const role = req.user.role;

  if (role !== 'admin') {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: 'Unauthorized this route' });
  }
  next();
};

module.exports = { checkPermission, authenticateUser, isAdmin };
