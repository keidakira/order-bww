const itemSchemas = require("../validations/Item");

class ItemMiddleware {
  // Check if id is valid
  checkItemId = (request, response, next) => {
    const { error, value } = itemSchemas.id.validate(request.params.id);

    if (error) {
      let errorMessage = error.details[0].message;
      errorMessage = errorMessage.replace(/"/g, "");

      return response.status(400).json({ message: errorMessage });
    }
    next();
  };

  // Create a new Item Validation
  createItem = (request, response, next) => {
    const { error, value } = itemSchemas.create.body.validate(request.body);

    if (error) {
      let errorMessage = error.details[0].message;
      errorMessage = errorMessage.replace(/"/g, "");

      return response.status(400).json({ message: errorMessage });
    }

    next();
  };

  // Update an Item Validation
  updateItem = (request, response, next) => {
    const { error, value } = itemSchemas.update.body.validate(request.body);

    if (error) {
      let errorMessage = error.details[0].message;
      errorMessage = errorMessage.replace(/"/g, "");

      return response.status(400).json({ message: errorMessage });
    }

    next();
  };

  // Delete an Item Validation
  deleteItem = (request, response, next) => {
    const { error, value } = itemSchemas.id.validate(request.params.id);

    if (error) {
      let errorMessage = error.details[0].message;
      errorMessage = errorMessage.replace(/"/g, "");

      return response.status(400).json({ message: errorMessage });
    }

    next();
  };
}

module.exports = new ItemMiddleware();
