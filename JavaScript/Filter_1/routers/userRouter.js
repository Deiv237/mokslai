const express = require("express");
const userRouter = require("../controllers/authController");
const validateNewUser = require("../validators/signup");
const validate = require("../validators/validate");

const { signup } = userRouter;

const router = express.Router();

router.route("/signup").post(validateNewUser, validate, signup);

module.exports = router;