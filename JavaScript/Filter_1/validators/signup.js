const {body} = require("express-validator");
const {getUserByEmail} = require("../models/userModel");

const validateNewUser = [
    //check if body is not empty

    // body()
    // .notEmpty()
    // .withMessage(`user body must contain data`),

    //check if email is not empty
    body(`email`)
    .notEmpty()
    .withMessage(`Email is required`)
    .isString()
    .withMessage(`Email is invalid`)
    .normalizeEmail()
    .custom(async (value) => {
        const user = await getUserByEmail(value);
        if (user) 
            throw new Error(`User with email ${value} already exists`);
            return true
    }),

    body(`username`)
    .notEmpty()
    .trim() //trim whitespace
    .withMessage(`Username is required`)
    .isString()
    .withMessage(`Username is invalid`),

    body(`password`)
    .notEmpty()
    .withMessage(`Password is required`)
    // .isLength({min: 8})
    .isStrongPassword()
    .withMessage(`Password must be at least 8 characters long, one lowercase, one uppercase, one number, one symbol`)
    .isString()
    .withMessage(`Password is invalid`)
    .custom((value, {req}) => {
        if (value !==req.body.passwordconfirm) {
        throw new Error(`Password and password confirm not match`)
        }
        return true;
    }),
];
module.exports = validateNewUser;