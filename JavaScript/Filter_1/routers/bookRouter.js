const express = require("express");
const bookController = require("../controllers/bookController");

const {getAllBooks, GetFilteredBooks} = bookController;

const bookRouter = express.Router();

bookRouter.route("/").get(getAllBooks);
bookRouter.route("/filter").get(GetFilteredBooks);

module.exports = bookRouter;