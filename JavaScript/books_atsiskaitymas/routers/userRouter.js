const express = require("express");
const {register, login} = require("../controllers/userController");
const validateNewUser = require("../validators/register");
const validateLogin = require("../validators/login");
const validate = require("../validators/validate");

const router = express.Router();

router.route(`/register`).post(validateNewUser, validate, register);
router.route(`/login`).post(validateLogin, validate, login);

module.exports = router;