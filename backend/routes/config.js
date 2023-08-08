import express from "express";

import Stripe from "stripe";

const stripe = new Stripe(
  "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"
);
const router = express.Router();

router.get("/pk", (req, res) => {
  res.json({ pk: process.env.PK });
});

router.post("/payment", async (req, res) => {
  try {
    const amount = req.body.amount * 100;

    const intent = await stripe.paymentIntents.create({
      currency: "usd",
      amount: amount,
    });

    console.log(intent);
    res.json({ clientSecret: intent.client_secret });
  } catch (error) {}
});

router.get("/register", async (req, res) => {
  try {
    stripe.applePayDomains.create({
      domain_name: "www.redash.us",
    });
  } catch (error) {
    res.json(error);
  }
});

export default router;
