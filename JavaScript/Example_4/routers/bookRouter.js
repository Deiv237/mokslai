const express = require("express");
const bookController = require("../controllers/bookController");
const validate = require("../validators/validate");
const {protect, allowAccessTo} = require("../controllers/authControler");
const bookValidate = require("../validators/bookValidate");

const {getAllBooks, GetFilteredBooks} = bookController;

const bookRouter = express.Router();

bookRouter.route("/").get(protect, allowAccessTo("admin", "user"), validate, getAllBooks);
bookRouter.route("/filter").get(bookValidate, validate, GetFilteredBooks);

module.exports = bookRouter;