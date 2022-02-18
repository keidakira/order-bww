const userSchemas = require("../validations/User");
const JWT = require("../helpers/JWT");
const jwtHelper = new JWT();
class UserMiddleware {
  // Validate JWT from Request Header
  validateJWT(req, res, next) {
    const authHeader = req.headers?.authorization;

    if (
      authHeader === undefined ||
      authHeader.startsWith("Bearer ") === false ||
      authHeader === null
    ) {
      return res.status(401).json({
        status: "error",
        message: "Invalid JWT token",
      });
    }

    const token = authHeader.split(" ")[1];
    const user = jwtHelper.decode(token);

    if (user === null) {
      return res.status(401).json({
        status: "error",
        message: "Invalid JWT token",
      });
    }

    req.user = user;

    next();
  }

  // Create a new User Validation
  createUser = (request, response, next) => {
    const { error, value } = userSchemas.create.body.validate(request.body);

    if (error) {
      let errorMessage = error.details[0].message;
      errorMessage = errorMessage.replace(/"/g, "");

      return response.status(400).json({ message: errorMessage });
    }

    next();
  };

  // Validate user login credentials
  loginUser = (request, response, next) => {
    const { error, value } = userSchemas.login.body.validate(request.body);

    if (error) {
      let errorMessage = error.details[0].message;
      errorMessage = errorMessage.replace(/"/g, "");

      return response.status(400).json({ message: errorMessage });
    }

    next();
  };
}

module.exports = new UserMiddleware();
