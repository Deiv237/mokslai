const { body } = require('express-validator');
const { getUserByUsername } = require('../models/userModel');

const validateNewUser = [
  body('username')
  .trim().notEmpty()
  .withMessage('User name is required')
  .custom(async (value) => {
    const user = await getUserByUsername(value);
    if (user) {
      throw new Error('Username already exists');
    }
    return true;
  }),
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