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
  body('username')
  .trim()
  .notEmpty()
  .withMessage('User name is required'),

  body('fullName')
  .trim()
  .notEmpty()
  .withMessage('Full name is required'),
];

module.exports = validateNewUser;