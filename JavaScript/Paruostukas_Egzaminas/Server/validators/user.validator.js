const { body, query } = require('express-validator');

exports.register = [
  body('username')
    .trim()
    .isLength({ min: 2, max: 30 })
    .withMessage(
      'First name should be at least 2 characters long and a maximum of 30 characters.'
    )
    .escape(),
  body('email')
    .trim()
    .isEmail()
    .withMessage('Invalid email format')
    // vardo dalyje leidziami simboliai
    // raides, skaiciai, taskas, pabraukimas ir bruksnelis
    .matches(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
    .withMessage('Invalid email characters'),
  body('password')
    .trim()
    .isStrongPassword({
      minLength: 6,
      minLowercase: 1,
      minNumbers: 1,
      minSymbols: 0,
      minUppercase: 0,
    })
    .withMessage(
      'Password must contain numbers, letters and must be minimum 6 characters length'
    )
    .escape(),
];

exports.login = [
  body('email').trim().isEmail().withMessage('Invalid email format').escape(),
  body('password').trim().escape(),
];