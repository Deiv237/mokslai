const { body } = require('express-validator');
const { getUserByEmail } = require('../models/userModel');

const validateRegister = [
  body('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email address')
    .normalizeEmail()
    .custom(async (value) => {
      const user = await getUserByEmail(value);
      if (user) {
        throw new Error('Email already in use');
      }
      return true;
    }),
  body('username')
  .trim()
  .notEmpty()
  .withMessage('Username is required'),

  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .custom((value, { req }) => {
      if (value !== req.body.passwordconfirm) {
        throw new Error('Passwords do not match');
      }
      return true;
    }),
];

module.exports = validateRegister;