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
    .isIn(['easy', 'medium', 'difficult'])
    .withMessage('Difficulty must be one of: easy, medium, difficult'),

  // Validate price: must be a number greater than or equal to 0
  query('price')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Price must be a non-negative number'),

  // Validate sort: must be either 'asc' or 'desc'
  query('sort')
    .optional()
    .isIn(['asc', 'desc'])
    .withMessage('Sort must be either "asc" or "desc" (case-insensitive)')
    .toLowerCase(),
];

module.exports = filterValidator;
