const userSchemas = require("../validations/User");

class UserMiddleware {
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
