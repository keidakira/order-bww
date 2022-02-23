const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

router.get("/payment/:id", async (req, res) => {
  const { id } = req.params;
  const paymentIntent = await stripe.paymentIntents.retrieve(id);

  let amount = paymentIntent.amount / 100;
  let currency = paymentIntent.currency;
  let cardDetails = paymentIntent.charges.data[0].payment_method_details.card;
  let cardBrand = cardDetails.brand;
  let cardLast4 = cardDetails.last4;
  let wallet = null;

  if (cardDetails.wallet !== null) {
    wallet = cardDetails.wallet.type;
  }

  res.json({
    amount,
    currency,
    cardBrand,
    cardLast4,
    wallet,
  });
});

module.exports = router;
