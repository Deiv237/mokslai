const express = require('express');
const {
  getAllPets,
  getPetById,
  createPet,
  UpdatePet,
  DeletePet,
} = require('../Controllers/petsController');
const validate = require('../validators/validate');
const { protect, allowAccessTo } = require('../Controllers/authController');

const router = express.Router();

router.route(`/`).get(getAllPets).post(createPet);
router
  .route(`/:id`)
  .get(getPetById)
  .patch(protect, allowAccessTo('admin'), validate, UpdatePet)
  .delete(protect, allowAccessTo('admin', `user`), validate, DeletePet);

module.exports = router;
