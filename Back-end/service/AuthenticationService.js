const jwt = require('jsonwebtoken');
const UtilClass = require('../util/Util');
const UserModel = require('../database/model/User');
const ErrorResponse = require('../model/response/ErrorResponse');
const GenericRepository = require('../database/repository/GenericRepository');

module.exports = class AuthenticationService {
  /**
   * Starts the service
   *
   * @author Guilherme da Silva Martin
   */
  static async init() {
    this.util = UtilClass.init();
    this.repository = await GenericRepository.init();

    return this;
  }

  /**
   * Verify JWT Token
   *
   * @author Guilherme da Silva Martin
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  static verifyJWT(req, res, next) {
    try {
      let token = req.cookies.access_token;

      if (!token) throw new ErrorResponse(401, 'No token provided.', null);

      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) throw new ErrorResponse(500, 'Failed to authenticate token.', null);

        req.userId = decoded.id;

        next();
      });
    } catch (ex) {
      throw ex;
    }
  }

  /**
   * Authenticate a user
   *
   * @author Guilherme da Silva Martin
   * @param {*} email
   * @param {*} password
   */
  static async authenticateUser(userData) {
    try {
      if (!this.util.isNullOrEmpty(userData)) {
        const token = await jwt.sign(
          { id: userData[0]._id, nickname: userData[0].Nickname, email: userData[0].Email },
          process.env.JWT_SECRET,
          { expiresIn: '1d' }
        );

        return token;
      } else {
        throw new ErrorResponse(400, 'User not found', null);
      }
    } catch (ex) {
      throw ex;
    }
  }

  /**
   * Login a user.
   *
   * @author Guilherme da Silva Martin
   */
  static async login(email, password) {
    try {
      let loginParams = {
        Email: email,
        Password: password
      };

      return await this.repository.find(UserModel, loginParams);
    } catch (ex) {
      throw ex;
    }
  }
};
