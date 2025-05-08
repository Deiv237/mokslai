const bcrypt = require('bcrypt');
const sequelize = require('../config/db');
const {
    user,
    user_secret,
} = sequelize.models;
const ApiError = require('../exceptions/api.errors');
const Op = require('sequelize').Op;

class UserService {
  /**
   * Naudotojo registracija
   * @param {*} username
   * @param {*} email
   * @param {*} password
   * @returns pranesimas
   */

  async register(username, email, password) {
    // tikrinam ar el. pasto adresas neuzimtas
    const existingUser = await user.findOne({
      where: { email: email.toLowerCase().trim() },
    });

    if (existingUser)
      throw ApiError.ConflictError(`Email ${email} already in use`);

    // cia naudojam tranzakcijas
    // nes rasom duomenis i dvi lenteles
    const transaction = await sequelize.transaction();

    try {
      await user.create(
        {
          username,
          email,
          user_secret: [{ password }], // password hashing done in model
        },
      );

      await transaction.commit();

      return { message: 'Registration successful. Please login.' };
    } catch (e) {
      await transaction.rollback();
      throw ApiError.BadRequest(`Registration failed: ${e.message}`);
    }
  }

  /**
   * Naudotojo prisijungimas
   * @param {*} email
   * @param {*} password
   * @returns tokenus ir naudotojo duomenis {id, role}
   */

  async login(email, password, ip) {
    const activeUser = await user.findOne({
      where: { email },
      include: [user_secret],
    });

    if (!activeUser) throw ApiError.BadRequest(`Incorrect email or password`);

    const valid = await bcrypt.compare(
      password,
      activeUser.user_secret.password
    );

    if (!valid) {
      throw ApiError.BadRequest(`Incorrect email or password`);
    }

    const tokens = tokenService.generateTokens({
      id: activeUser.id,
      role: activeUser.role,
      username: activeUser.username,
    });

    await tokenService.saveRefreshToken(activeUser.id, tokens.refreshToken);

    // loginam userio data
    await userLogService.logUserLogin(activeUser.id, ip);

    return {
      ...tokens,
      user: {
        id: activeUser.id,
        role: activeUser.role,
        username: activeUser.username,
      },
    };
  }

    /**
   * Naudotojo isregistravimas
   * @param {*} refreshToken
   * @returns skaicius, kiek irasu istrinta
   */
    async logout(refreshToken) {
        // patikrinam, ar tokenas validus
        const userData = tokenService.validateRefreshToken(refreshToken);
    
        if (!userData) throw ApiError.BadRequest('Invalid request');
    
        const token = await tokenService.removeToken(refreshToken);
    
        return token;
      }
}

module.exports = new UserService();