// All checkout related routes
const express = require("express");
const userMiddleware = require("../middleware/User");
const DraftCart = require("../models/DraftCart");
const PaymentSession = require("../models/PaymentSession");
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

    // Create a new paymentSession before redirecting to the client
    const paymentSession = new PaymentSession({
      user: req.user._id,
      totalAmount: cart.total,
    });

    try {
      const response = await paymentSession.save();

      const session = await stripe.checkout.sessions.create({
        line_items: items,
        mode: "payment",
        success_url: `http://localhost:4242/api/checkout/status?paymentSession=${response._id}`,
        cancel_url: `http://localhost:4242/api/checkout/status?paymentSession=${response._id}`,
      });

      const { id: sessionId, payment_intent: paymentIntent } = session;

      await PaymentSession.findByIdAndUpdate(response._id, {
        $set: {
          sessionId,
          paymentIntent,
        },
      });

      res.redirect(303, session.url);
    } catch (error) {
      console.log(error);
      res.send("Error occurred");
    }
  }
);

router.get("/status", async (req, res) => {
  const { paymentSession: paymentSessionId } = req.query;

  const paymentSession = await PaymentSession.findById(paymentSessionId);
  const paymentIntent = paymentSession.paymentIntent;

  const payment = await stripe.paymentIntents.retrieve(paymentIntent);
  let status = "cancel";

  if (payment.status === "succeeded") {
    // Complete the paymentSession
    await PaymentSession.findByIdAndUpdate(paymentSessionId, {
      $set: {
        status: "completed",
      },
    });
    status = "success";

    // Clear the cart
    await DraftCart.deleteOne({ user: paymentSession.user });
  } else {
    // Cancel the paymentSession
    await PaymentSession.findByIdAndUpdate(paymentSessionId, {
      $set: {
        status: "cancelled",
      },
    });
  }

  res.redirect("http://localhost:3000/" + status);
});

module.exports = router;
