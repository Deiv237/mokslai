const express = require("express");
const validate = require("../validators/validate");
const bookController = require("../controllers/bookController");
const {protect, allowAccessTo} = require("../controllers/userController");
const {postBookValidate, patchBookValidate, bookValidate} = require("../validators/bookValidate");

const {getAllBooksController, getAllBooksByIdController, postBookController, patchBookController, deleteBookController, GetFilteredBooks} = bookController;

const bookRouter = express.Router();

bookRouter.route("/").get(getAllBooksController).get(bookValidate, validate, GetFilteredBooks).post(protect, allowAccessTo("admin"), postBookValidate, validate, postBookController);
bookRouter.route("/:id").get(getAllBooksByIdController).patch(protect, allowAccessTo("admin"), patchBookValidate, validate,patchBookController).delete(protect, allowAccessTo("admin"), validate, deleteBookController);
module.exports = bookRouter;