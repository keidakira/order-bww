// Controller for Items Model
const Item = require("../models/Item");
const ItemValidator = require("../validations/Item");

module.exports = {
  // Get an item by id
  getItem: async (req, res, next) => {
    const item = await Item.findById(itemId);

    if (!item) {
      return res.status(404).json({
        status: "error",
        message: "Item not found",
      });
    }

    return res.status(200).json({
      status: "success",
      data: {
        item,
      },
    });
  },
};
