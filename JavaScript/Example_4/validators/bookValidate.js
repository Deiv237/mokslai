const { query } = require("express-validator");

const bookValidate = [
    query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer')
    .toInt(),

  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be a positive integer')
    .toInt()
];

module.exports = bookValidate;