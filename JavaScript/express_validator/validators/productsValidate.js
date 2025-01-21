const { query } = require('express-validator');

const productsValidate = [
  query('price')
    .optional()
    .isFloat({ min: 0, max: 99.99 })
    .withMessage('Price must be a positive number with up to 2 decimal places.'),

  query('category')
    .not().isEmpty()
    .isIn(['Fruit', 'Vegetable'])
    .withMessage('Category is required and must be either "Fruit" or "Vegetable".'),
];

module.exports = productsValidate;