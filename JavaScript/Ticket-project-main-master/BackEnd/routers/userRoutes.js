const express = require('express');
const {userPostController, getAllUsers, getUser} = require('../controllers/userController');

const router = express.Router()

router.route('/').post(userPostController)
router.route('/').get(getAllUsers)
router.route('/:id').get(getUser)

module.exports = router