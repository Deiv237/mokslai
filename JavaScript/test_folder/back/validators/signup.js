const { body } = require('express-validator');
const { getUserByEmail } = require('../models/userModel');

const validateNewUser = [
  body('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Email is invalid')
    .normalizeEmail()
    .custom(async (value) => {
      const user = await getUserByEmail(value);
      if (user) {
        throw new Error('Email address already in use');
      }
      return true;
    }),
  body('username').trim().notEmpty().withMessage('User name is required'),
  body('password')
    .notEmpty()
    .withMessage('Password required')
    .custom((value, { req }) => {
      if (value !== req.body.passwordconfirm) {
        throw new Error('Password and password confirm not match');
      }
      return true;
    }),
];

module.exports = validateNewUser;