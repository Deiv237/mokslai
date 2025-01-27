const { getAllAuthors, postAuthor } = require("../models/authModel");
const appError = require("../utils/appError");

exports.getAllAuthorsController = async (req, res) => {
    try {
        const books = await getAllAuthors();
        res.status(200).json(books);
    }   catch (error) {
        next(error);
    }
};
exports.getAllAuthorsByIdController = async (req, res) => {
    try {
        const books = await getAllAuthors();
        res.status(200).json(books);
    }   catch (error) {
        next(error);
    }
};
exports.postAuthorController = async (req, res) => {
    try {
        const author = req.body;
        const newAuthor = await postAuthor(author);
        res.status(201).json({
            status: "success",
            data: newAuthor,
        });
    }   catch (error) {
        res.status(400).json(error);
    }
};//failed