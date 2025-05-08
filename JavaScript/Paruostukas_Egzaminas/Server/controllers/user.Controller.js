const { validationResult } = require('express-validator');
const userService = require('../services/user.service');
const ApiError = require('../exceptions/api.errors');
const TokenService = require('../services/token.service');
const sequelize = require('../config/db');

class UserController {
    errorToString(errorsArray) {
    let errString = '';
    
    for (const element of errorsArray) {
        errString += element.msg + '; ';
    }
    
    return errString;
}

    /**
   * Naudotojo registracija
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @returns pranesimas apie sekminga registracija
   */

    async register(req, res, next) {
        try {
          const errors = validationResult(req);
    
          if (!errors.isEmpty()) {
            // galimas ir toks variantas
            // grazinam ne masyva, o perdarom ir string pranesimus
            const err = errors.array();
            let errString = '';
    
            for (const element of err) {
              errString += element.msg + '; ';
            }
    
            throw ApiError.BadRequest(errString);
          }
    
          const { username, email, password } = req.body;
    
          const newUser = await userService.register(username, email, password);
    
          return res.status(201).json(newUser);
        } catch (e) {
          next(e);
        }
      }

        /**
   * Naudotojo prisijungimas
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @returns tokena ir naudotoja (id, role) arba pranesima apie klaida
   */
  async login(req, res, next) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty())
        throw ApiError.BadRequest('Validation error', errors.array());

      // jei nera validacijos klaidu, tesiam
      const { email, password } = req.body;

      const loggedUser = await userService.login(email, password, req.ip);
      console.log(loggedUser);

      // refreshToken dedam i cookies
      res.cookie('refreshToken', loggedUser.refreshToken, {
        maxAge: 24 * 60 * 60 * 1000, // 1 diena
        httpOnly: true,
      });

      return res
        .status(200)
        .json({
          accessToken: loggedUser.accessToken,
          user: loggedUser.user,
        });
    } catch (e) {
      next(e);
    }
  }

  /**
   *
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @returns success: status 200 + message failure: status 204 no content
   */
  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;

      // jei nėra refresh tokeno, tai saugumo sumetimais
      // grąžiname 204 status, tipo kad nenutekėtų info
      if (!refreshToken) throw ApiError.NoContent();

      await userService.logout(refreshToken);

      res.clearCookie('refreshToken');

      return res.status(200).json({ message: 'Logout successfull.' });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new UserController();