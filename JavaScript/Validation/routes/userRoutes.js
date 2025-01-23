const express = require('express');
const { signup, login } = require('../controlers/authControler');
const validateNewUser = require('../validators/signup');
const validateLogin = require('../validators/login');
const validate = require('../validators/validate');

const router = express.Router();

router.route('/signup').post(validateNewUser, validate, signup);
router.route('/login').post(validateLogin, validate, login);

module.exports = router;
