const { query } = require('express-validator');
const { getDifficultyById } = require('../models/difficultyModel');

const paginationValidator = [
  query('page')
    .optional()
    .isInt({ min: 1 }) // must be an integer >= 1
    .withMessage('Page must be a positive integer') // error message
    .toInt(), // convert to integer

    query('limit')
    .optional()
    .isInt({ min: 1, max: 100 }) // must be an integer >= 1
    .withMessage('Limit must be a positive integer') // error message
    .toInt() // convert to integer
    .custom((value) => {
      if (value % 3 !== 0) {
        throw new Error('Limit must be a multiple of 3');
      }
      return true; //validation passed
    })
    .custom(async(value) => {
      const difficulty = await getDifficultyById(value);

      if (!difficulty) {
        throw new Error('Difficulty not found');
      }
      return true;
    }),
];

module.exports = paginationValidator;
