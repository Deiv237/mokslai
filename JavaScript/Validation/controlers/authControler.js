const argon2 = require('argon2');
const { createUser, getUserByEmail } = require('../models/userModel');
const jwt = require('jsonwebtoken');

const signToken = (id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  return token;
};

const sendCookie = (token, res) => {
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res.cookie('jwt', token, cookieOptions);
};

exports.signup = async (req, res, next) => {
  try {
    const newUser = req.body;

    const hash = await argon2.hash(newUser.password);

    newUser.password = hash;

    const createdUser = await createUser(newUser);

    // if (!createdUser) throw new AppError('User not created', 500);

    //po signup iš karto login
    const token = signToken(createdUser.id);

    //išsiunčiame cookie su token
    sendCookie(token, res);

    createdUser.password = undefined;
    createdUser.id = undefined;

    res.status(201).json({
      status: 'success',
      data: createdUser,
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
      status: 'success',
      data: user,
    });
  } catch (error) {
    next(error);
  }
};
