const { validationResult } = require('express-validator');

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'fail',
      message: errors.array(),
    });
  }
  next();
};

module.exports = validate;

// const { validationResult } = require(`express-validator`);
// const appError = require(`../utils/appError`);

// const validate = (req, res, next) => {
//     try {
//         const errors = validationResult(req);

//   const errorStrings = errors
//     .array()
//     .map((error) => error.msg)
//     .join("; ");

//   if (!errors.isEmpty()) {
//     throw new appError(errorStrings, 400);
//   }
//   next();
//     }   catch (error){
//         next(error);
//     }
// };

// module.exports = validate;

// const { validationResult } = require('express-validator');
// const AppError = require('../utils/appError');

// const validate = (req, res, next) => {
//     const errors = validationResult(req);
    
//     if (!errors.isEmpty()) {
//         const errorMessages = errors
//             .array()
//             .map(error => error.msg)
//             .join('; ');

//         return next(new AppError(errorMessages, 400));
//     }

//     next();
// };

// module.exports = validate;