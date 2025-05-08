const Router = require("express");
const userController = require('../controllers/user.Controller');
const validator = require('../validators/user.validator');

const userRouter = new Router();

userRouter.post('/register', validator.register, userController.register);
userRouter.post('/login', validator.login, userController.login);
userRouter.post('/logout', userController.logout);

module.exports = userRouter;