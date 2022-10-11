const crypto = require('crypto');
const {
  hashPassword,
  sendVerificationEmail,
  comparePassword,
  createTokenUser,
  attachCookiesToResponse,
} = require('../utils');
const { StatusCodes } = require('http-status-codes');
const { User, Student } = require('../models/index');

const register = async (req, res) => {
  let { email, password, confirmPassword } = req.body;

  const [correctEmail] = await Student.findAll({ where: { email } });

  if (!correctEmail) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: 'Please provide valid email' });
  }

  let { firstname, lastname, birthdate, university_id } =
    correctEmail.dataValues;

  const [existingEmail] = await User.findAll({ where: { email } });

  if (existingEmail) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: 'Email already exists' });
  }

  if (password !== confirmPassword) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: 'Confirm password is not correct' });
  }

  password = await hashPassword(password);

  const verificationToken = crypto.randomBytes(40).toString('hex');

  await User.create({
    firstname,
    lastname,
    email,
    birthdate,
    university_id,
    password,
    verificationtoken: verificationToken,
  });

  const origin = 'http://localhost:3300';

  sendVerificationEmail({
    name: firstname,
    email,
    verificationToken,
    origin,
  });

  res.status(StatusCodes.CREATED).json({
    msg: 'Success! Please check your email to verify account',
  });
};

const verifyEmail = async (req, res) => {
  const { verificationToken, email } = req.body;

  if (req.user.verificationtoken !== verificationToken) {
    return res.status(StatusCodes.UNAUTHORIZED).json('Verification failed!');
  }

  await User.update(
    { isverified: true, verificationtoken: null },
    { where: { email } }
  );

  res.status(StatusCodes.OK).json({ msg: 'Email verified' });
};

const login = async (req, res) => {
  // email existing check with middleware checkPermission
  const { password } = req.body;
  if (!password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: 'Please provide password' });
  }

  const isPasswordCorrect = await comparePassword(password, req.user.password);

  if (!isPasswordCorrect) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: 'PLease provide valid password' });
  }

  if (!req.user.isverified) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: 'Please verify your email' });
  }

  const tokenUser = createTokenUser(req.user);

  attachCookiesToResponse({ res, user: tokenUser });

  res.status(StatusCodes.OK).json({ user: tokenUser });
};

const logout = async (req, res) => {
  res.cookie('accessToken', logout, {
    httpOnly: true,
    expires: new Date(Date.now()),
  });

  res.status(StatusCodes.OK).json({ msg: 'user logged out!' });
};

const deleteAccount = async (req, res) => {
  await User.update(
    { deletedAt: 'inactive' },
    { where: { id: req.params.id } }
  );

  res.status(StatusCodes.OK).json({ msg: 'Account deleted' });
};

module.exports = { register, login, logout, verifyEmail, deleteAccount };
