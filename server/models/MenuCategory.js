// MenuCategory Modal
const mongoose = require("mongoose");

const MenuCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    items: [{ type: mongoose.Schema.Types.ObjectId, ref: "Item" }],
  },
  { timestamps: true }
);

module.exports = MenuCategory = mongoose.model(
  "MenuCategory",
  MenuCategorySchema
);
