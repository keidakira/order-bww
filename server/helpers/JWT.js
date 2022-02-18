const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

/**
 * JWT is a class that provides methods for encoding and decoding JSON Web Tokens.
 *
 * @class JWT
 * @author Srinandan Komanduri
 */
class JWT {
  /**
   * Creates an instance of JWT.
   *
   * @constructor
   *
   * Set the JWT secret from the .env file
   */
  constructor() {
    this.secret = process.env.JWT_SECRET;
  }

  /**
   * @param {Object} payload
   * @returns JWT token
   */
  encode(payload) {
    return jwt.sign(payload, this.secret);
  }

  /**
   * @param {JWT Token} token
   *
   * @returns {Object} payload (If valid)
   * @returns {null} if token is invalid
   */
  decode(token) {
    try {
      const data = jwt.verify(token, this.secret);
      return data;
    } catch (err) {
      return null;
    }
  }
}

module.exports = JWT;
