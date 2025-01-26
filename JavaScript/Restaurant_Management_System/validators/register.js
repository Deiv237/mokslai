const { body } = require('express-validator');
// const { getUserByEmail } = require('../models/userModel');

// const validateRegister = [
//   body('email')
//   .notEmpty()
//   .withMessage('Email is required')
//   .isEmail()
//   .withMessage('Invalid email address')
//   .normalizeEmail({ all_lowercase: true }) // Normalize to lowercase
//   .custom(async (value) => {
//     const user = await getUserByEmail(value.toLowerCase()); // Ensure lowercase comparison
//     if (user) {
//       throw new Error('Email already in use');
//     }
//     return true;
//   }),
//   body('username')
//     .trim()
//     .notEmpty()
//     .withMessage('Username is required')
//     .isLength({ min: 3 })
//     .withMessage('Username must be at least 3 characters long'),
//   body('password')
//     .notEmpty()
//     .withMessage('Password is required')
//     .isLength({ min: 8 })
//     .withMessage('Password must be at least 8 characters long')
//     .matches(/[A-Z]/)
//     .withMessage('Password must contain at least one uppercase letter')
//     .matches(/[a-z]/)
//     .withMessage('Password must contain at least one lowercase letter')
//     .matches(/[0-9]/)
//     .withMessage('Password must contain at least one number')
//     .matches(/[@$!%*?&#]/)
//     .withMessage('Password must contain at least one special character')
//     .custom((value, { req }) => {
//       if (value !== req.body.passwordconfirm) {
//         throw new Error('Passwords do not match');
//       }
//       return true;
//     }),
//   body('passwordconfirm')
//     .notEmpty()
//     .withMessage('Password confirmation is required'),
//   body('first_name')
//     .notEmpty()
//     .withMessage('First name is required')
//     .isAlpha()
//     .withMessage('First name must only contain letters')
//     .trim(),
//   body('last_name')
//     .notEmpty()
//     .withMessage('Last name is required')
//     .isAlpha()
//     .withMessage('Last name must only contain letters')
//     .trim(),
//   body('age')
//     .optional()
//     .isInt({ min: 18, max: 120 })
//     .withMessage('Age must be a number between 18 and 120'),
//   body('country_id')
//     .optional()
//     .isInt()
//     .withMessage('Country ID must be a valid number'),
//   body('bio')
//     .optional()
//     .isLength({ max: 255 })
//     .withMessage('Bio must not exceed 255 characters'),
//   body('profile_picture')
//     .optional()
//     .isURL()
//     .withMessage('Profile picture must be a valid URL'),
//     body('role_id')
//     .optional()
//     .isInt()
//     .withMessage('Role ID must be a valid number (1 for user, 2 for admin)'),
// ];

// module.exports = validateRegister;

const { sql } = require("../dbConnection");

const validateRegister = [
  // Other validations...
  body("country_id")
    .optional()
    .custom(async (value) => {
      const [country] = await sql`SELECT id FROM countries WHERE id = ${value}`;
      if (!country) {
        throw new Error("Invalid country_id");
      }
      return true;
    }),
  body("role_id")
    .optional()
    .custom(async (value) => {
      const [role] = await sql`SELECT id FROM roles WHERE id = ${value}`;
      if (!role) {
        throw new Error("Invalid role_id");
      }
      return true;
    }),
];
 module.exports = validateRegister;