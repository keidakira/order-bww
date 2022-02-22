const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    items: [
      {
        item: { type: mongoose.Schema.ObjectId, ref: "Item" },
        quantity: { type: Number, default: 1 },
      },
    ],
    paymentSession: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PaymentSession",
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", OrderSchema);
module.exports = Order;
