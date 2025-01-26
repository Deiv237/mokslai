const express = require("express");
const validateRegister = require("../validators/register");
const { register, getAllUsers } = require("../controllers/userControler");
const validate = require("../validators/validate");

const router = express.Router();

router.route(`/`).get(validate, getAllUsers).post(validateRegister, validate, register);
router.route(`/login`).post();
router.route(`/:id`).get().put().delete();

module.exports = router;