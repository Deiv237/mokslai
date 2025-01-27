const {body, query} = require("express-validator");
const {getAuthorById} = require("../models/authModel");

exports.postBookValidate = [
    body('title')
    .isLength({min: 2})
    .withMessage("Title must be at least 2 characters long"),

    body('summary')
    .isLength({min: 3, max: 150})
    .withMessage("Summary must be at least 3 characters long and at most 150 characters long"),

    body('isbn')
    .matches(/^[0-9-]+$/)
    .withMessage("ISBN must be 10 characters long and only contain numbers and hyphens")
    .isLength({min: 10, max: 10})
    .withMessage("ISBN must be 13 characters long"),

    body('authorId')
    .isInt()
    .withMessage("Author ID must be an integer")
    .custom((value, { req }) => {
        return getAuthorById(value).then((author) => {
            if (!author) {
                return Promise.reject(new Error("Author ID does not exist"));
            }
        });
    })
    .withMessage("Author ID does not exist"),
];

exports.patchBookValidate = [
    body('title')
    .isLength({min: 2})
    .withMessage("Title must be at least 2 characters long"),

    body('summary')
    .isLength({min: 3, max: 150})
    .withMessage("Summary must be at least 3 characters long and at most 150 characters long"),
];

exports.bookValidate = [
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