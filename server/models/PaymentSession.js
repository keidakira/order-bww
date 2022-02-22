// PaymentSession Model
const mongoose = require("mongoose");

const PaymentSessionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  sessionId: {
    type: String,
    required: true,
    default: "None",
  },
  paymentIntent: {
    type: String,
    required: true,
    default: "None",
  },
  status: {
    type: String,
    enum: ["pending", "paid", "cancelled"],
    default: "pending",
  },
});

const PaymentSession = mongoose.model("PaymentSession", PaymentSessionSchema);
module.exports = PaymentSession;
