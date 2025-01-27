const { validationResult } = require(`express-validator`);
const appError = require(`../utils/appError`);

const validate = (req, res, next) => {
    try {
        const errors = validationResult(req);

  const errorStrings = errors
    .array()
    .map((error) => error.msg)
    .join("; ");

  if (!errors.isEmpty()) {
    throw new appError(errorStrings, 400);
  }
  next();
    }   catch (error){
        next(error);
    }
};

module.exports = validate;
