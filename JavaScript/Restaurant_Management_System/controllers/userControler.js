const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const { createUser, getAll, getUserById, updateUser, deleteUser, getUserByEmail } = require("../models/userModel");
const appError = require("../utils/appError");
const { validationResult } = require("express-validator");

const signToken = (id) => {
    const token = jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
    return token;
};

const sendCookie = (token, res) => {
    res.cookie("jwt", token, {
        expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        httpOnly: true,
    });
};

exports.register = async (req, res, next) => {
  try {
    const errors = validationResult(req);
if (!errors.isEmpty()) {
  console.error(errors.array()); // Log detailed validation errors
  return res.status(400).json({
    status: "fail",
    errors: errors.array(), // Include specific error messages
  });
}

    const newUser = req.body;

    // Hash the password securely
    const hash = await argon2.hash(newUser.password);
    newUser.password = hash;

    // Remove passwordconfirm as it’s only for validation
    delete newUser.passwordconfirm;

    // Create the user in the database
    const createdUser = await createUser(newUser);

    // Generate and send token
    const token = signToken(createdUser.id);
    sendCookie(token, res);

    // Remove sensitive information before sending response
    delete createdUser.password;
    delete createdUser.id;

    res.status(201).json({
      status: 'success',
      data: {
        user: createdUser,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
    try {
        const { email } = req.body;
        const user = await getUserByEmail(email);

        const token = signToken(user.id);
        sendCookie(token, res);

        user.password = undefined;
        user.id = undefined;

        res.status(200).json({
            status: "success",
            data: user,
        });
    } catch (error) {
        next(error);
    }
};

exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await getAll();
        res.status(200).json({
            status: "success",
            results: users.length,
            data: users,
        });
    } catch (error) {    
        next(error);
    }
};