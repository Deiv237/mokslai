const jwt = require("jsonwebtoken");
const AppError = require("../utils/appError");
const { createUser, getAllUsers } = require("../models/userModel");

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

exports.signup = async (req, res, next) => {
    try {
        const newUser = req.body;

        newUser.role = "user";

        const createdUser = await createUser(newUser);

        const token = signToken(createdUser.id);

        sendCookie(token, res);

        createdUser.id = undefined;

        res.status(201).json({
            status: "success",
            data: {
                user: createdUser,
            },
        });
    } catch (error) {
        next(error);
    }
};

exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await getAllUsers();
        res.status(200).json({
            status: "success",
            data: {
                users,
            },
        });
    } catch (error) {
        next(error);
    }
};