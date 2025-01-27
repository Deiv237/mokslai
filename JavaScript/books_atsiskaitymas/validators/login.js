const {body} = require("express-validator");
const argon2 = require("argon2");
const {getUserByUsername} = require("../models/userModel");

const validateLogin = [
    body('username')
      .notEmpty()
      .withMessage('Username is required')
      .custom(async (value) => {
        const user = await getUserByUsername(value);
        if (!user) {
          throw new Error('User not found, please sign up');
        }
        return true;
      }),
  
      body('password')
    .notEmpty()
    .withMessage('Password is required')
    .custom(async (value, { req }) => {
        const existingUser = await getUserByUsername(req.body.username);

        if (existingUser) {
            const match = await argon2.verify(existingUser.password, value);

            if (!match) {
                throw new Error('Password is incorrect');
            }   
            return true;
        }   else {
                throw new Error('User not found, please sign up');
        }
    }),
  ];

module.exports = validateLogin;