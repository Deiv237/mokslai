const { getAllTours, filterTours, deleteTour, createTour } = require('../models/tourModel');
const AppError = require('../utils/appError');

exports.getAllTours = async (req, res, next) => {
    try {
        const tours = await getAllTours();
        res.status(200).json({
            status: 'success',
            data: tours,
        });
    } catch (error) {
        next(error);
    }
};

exports.GetFilteredTours = async (req, res) => {
    try {
      const filter = req.query;
  
      if (!filter.name && !filter.date) {
        throw new AppError('Please provide either a name or a date to filter by', 400);
      }
  
      const filteredTours = await filterTours(filter);
  
      res.status(200).json({
        status: 'success',
        data: filteredTours,
      });
    } catch (error) {
      res.status(500).json({
        status: 'fail',
        message: error.message,
      });
    }
  };

  exports.createTour = async (req, res) => {
    try {
      const newtour = req.body;
  
      const createdTour = await createTour(newtour);
  
      res.status(201).json({
        status: 'success',
        data: createdTour,
      });
    } catch (error) {
      res.status(500).json({
        status: 'fail',
        message: error.message,
      });
    }
  };

  exports.deleteTour = async (req, res) => {
    try {
      const id = req.params.id;
  
      const deletedTour = await deleteTour(id);
  
      res.status(200).json({
        status: 'success',
        data: deletedTour,
      });
    } catch (error) {
      res.status(500).json({
        status: 'fail',
        message: error.message,
      });
    }
  };