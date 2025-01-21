const { query } = require('express-validator');

const filterValidator = [
  // Validate duration: must be an integer greater than or equal to 0
  query('duration')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Duration must be a non-negative integer'),

  // Validate difficulty: must be one of 'easy', 'medium', 'difficult'
  query('difficulty')
    .optional()
    .isIn(['Easy', 'Medium', 'Hard'])
    .withMessage('Difficulty must be one of "Easy", "Medium", "Hard"'),

  // Validate price: must be a number greater than or equal to 0
  query('price')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Price must be a non-negative number'),

  // Validate category: must be a string
  query('category')
    .optional()
    .isString()
    .withMessage('Category must be a string'),

  // Validate sort: must be either 'asc' or 'desc'
  query('sort')
    .optional()
    .isIn(['asc', 'desc'])
    .withMessage('Sort must be either "asc" or "desc" (case-insensitive)')
    .toLowerCase(),
];

module.exports = filterValidator;
