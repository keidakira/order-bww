// DraftCart Model
const mongoose = require("mongoose");

const DraftCartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    items: [
      {
        item: { type: mongoose.Schema.ObjectId, ref: "Item" },
        quantity: { type: Number, default: 1 },
      },
    ],
    total: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = DraftCart = mongoose.model("DraftCart", DraftCartSchema);
