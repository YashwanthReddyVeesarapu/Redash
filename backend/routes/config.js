import express from "express";

import Stripe from "stripe";

const stripe = new Stripe(
  "sk_test_51NIulyITgiS0q6TOcRR2pobOZBNssghlRZh2Gt1Po4vflFO8b1Jx8W0SrQ8pfEhA73DIvzaJqTSf0SWoWP1c7PI700qOIzuUmI"
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

    res.json({ clientSecret: intent.client_secret });
  } catch (error) {}
});

export default router;
