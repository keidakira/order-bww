// All checkout related routes
const express = require("express");
const userMiddleware = require("../middleware/User");
const Order = require("../models/Order");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

router.post(
  "/",
  (req, res, next) => {
    req.headers.authorization = `Bearer ${req.body.userToken}`;
    next();
  },
  userMiddleware.validateJWT,
  userMiddleware.getCart,
  async (req, res) => {
    // Strip things go inside here
    const { cart } = req;

    const items = cart.items.map(({ item, quantity }) => {
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: item.title,
            images: [item.image],
          },
          unit_amount: item.price * 100,
        },
        quantity: quantity,
      };
    });

    // Create a new order before redirecting to the client
    const order = new Order({
      user: req.user._id,
      totalAmount: cart.total,
    });

    try {
      const response = await order.save();

      const session = await stripe.checkout.sessions.create({
        line_items: items,
        mode: "payment",
        success_url: `http://localhost:3000/success?order=${response._id}`,
        cancel_url: `http://localhost:3000/cancel?order=${response._id}`,
      });

      res.redirect(303, session.url);
    } catch (error) {
      console.log(error);
      res.send("Error occurred");
    }
  }
);

router.post("/success", (req, res) => {
  res.json({ message: "Payment successful" });
});

module.exports = router;
