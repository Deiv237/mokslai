const {getAllBooks, postBook, patchBook, deleteBook, filterBooks} = require("../models/bookModel");
const appError = require("../utils/appError");

exports.getAllBooksController = async (req, res) => {
    try {
        const books = await getAllBooks();
        res.status(200).json(books);
    }   catch (error) {
        next(error);
    }
};
exports.getAllBooksByIdController = async (req, res) => {
    try {
        const books = await getAllBooks();
        res.status(200).json(books);
    }   catch (error) {
        next(error);
    }
};
exports.postBookController = async (req, res) => {
    try {
        const book = req.body;
        const newBook = await postBook(book);
        res.status(201).json({
            status: "success",
            data: newBook,
        });
    }   catch (error) {
        next(error);
    }
};
exports.patchBookController = async (req, res) => {
    try {
        const book = req.body;
        const updatedBook = await patchBook(req.params.id, book);
        res.status(200).json({
            status: "success",
            data: updatedBook,
        });
    }   catch (error) {
        next(error);
    }
};

exports.deleteBookController = async (req, res) => {
    try {
        const deletedBook = await deleteBook(req.params.id);
        res.status(200).json({
            status: "success",
            data: deletedBook,
        });
    }   catch (error) {
        next(error);
    }
};
exports.GetFilteredBooks = async (req, res) => {
    try {
      const filter = req.query;
      let page = parseInt(filter.page);
      let limit = parseInt(filter.limit);
  
      const offset = (page - 1) * limit;
  
      if (page < 1 || limit < 1) {
        return res.status(400).json({
          status: "fail",
          message: "Invalid page or limit value",
        });
      }
  
      const filteredBooks = await filterBooks(filter, limit, offset);
  
      res.status(200).json({
        status: "success",
        data: filteredBooks,
      });
    } catch (error) {
      next(error);
    }
  };