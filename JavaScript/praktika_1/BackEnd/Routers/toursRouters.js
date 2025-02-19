const express = require('express');
const { getAllTours, GetFilteredTours, createTour, deleteTour } = require('../Controllers/tourController');
const validate = require('../validators/validate');
const { protect, allowAccessTo } = require('../Controllers/authController');

const router = express.Router();

router.route('/').get(getAllTours).post(protect, allowAccessTo('admin'), validate, createTour);
router.route('/:id').delete(deleteTour);
router.route('/filter').get(GetFilteredTours);

module.exports = router;
