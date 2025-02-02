const express = require("express");
const {signup, getAllUsers} = require("../controllers/userController");
const validateNewUser = require("../validators/signup");
const validate = require("../validators/validate");
const router = express.Router();

router.route(`/`).get(getAllUsers);
router.route(`/signup`).post(validateNewUser, validate, signup);

module.exports = router;