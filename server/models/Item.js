// Item modal
const mongoose = require("mongoose");
const MenuCategory = require("./MenuCategory");

const ItemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "MenuCategory",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = Item = mongoose.model("Item", ItemSchema);
