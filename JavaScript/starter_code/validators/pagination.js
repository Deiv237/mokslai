const { query } = require('express-validator');
// const { getDifficultyById } = require('../models/difficultyModel');

const paginationValidator = [
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
    .custom((value) => {
      if (value % 3 !== 0) {
        throw new Error('Limit must be a multiple of 3');
      }
      return true;
    })
    // .custom(async(value) => {
    //   const difficulty = await getDifficultyById(value);

    //   if (!difficulty) {
    //     throw new Error('Difficulty not found');
    //   }
    //   return true;
    // }),
];

module.exports = paginationValidator;
