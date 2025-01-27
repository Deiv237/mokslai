const express = require("express");
const validate = require("../validators/validate");
const authController = require("../controllers/authController");
const authValidate = require("../validators/authValidate");

const {postAuthValidate} = authValidate;
const {getAllAuthorsController, getAllAuthorsByIdController, postAuthorController} = authController;

const authRouter = express.Router();

authRouter.route("/").get(getAllAuthorsController).post(postAuthValidate, validate, postAuthorController);
authRouter.route("/:id").get(getAllAuthorsByIdController).patch().delete();

module.exports = authRouter;