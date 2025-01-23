const { body } = require('express-validator');
const { getUserByEmail } = require('../models/userModel');

const validateNewUser = [
  //check if body is not empty

  // body().notEmpty().withMessage('User body must contain data'),

  body('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Email is invalid')
    .normalizeEmail()
    .custom(async (value) => {
      const user = await getUserByEmail(value);

      if (user) throw new Error('User already exist');
      return true; //validation passed
    }),

  body('username').trim().notEmpty().withMessage('User name is required'),

  body('password')
    .notEmpty()
    .withMessage('Password required')
    // .isLength({ min: 8 })
    // .isStrongPassword()
    // .withMessage(
    //   'Password mus be at least 8 symbols, one lowecase, one uppercase, one number, one symbol'
    // )
    .custom((value, { req }) => {
      if (value !== req.body.passwordconfirm) {
        throw new Error('Password and password confirm not match');
      }
      return true;
    }),
];
module.exports = validateNewUser;
