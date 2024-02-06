import express from "express";

import Stripe from "stripe";

const router = express.Router();

router.get("/pk", (req, res) => {
  let PK = process.env.PK;
  // let PK =
  //   "pk_test_51NIulyITgiS0q6TOBqY6NwP6pDBECYsoYlHlxaLB1zTJlOKIYXeno0x2fV32PoqvAvnNiWf0OmK7qw9pF5YHfXgN00ZAHijK4r";

  res.json({ pk: PK });
});

router.post("/payment", async (req, res) => {
  try {
    let SK = process.env.SK;
    // let SK =
    //   "sk_test_51NIulyITgiS0q6TOcRR2pobOZBNssghlRZh2Gt1Po4vflFO8b1Jx8W0SrQ8pfEhA73DIvzaJqTSf0SWoWP1c7PI700qOIzuUmI";
    const amount = req.body.amount * 100;
    const stripe = new Stripe(SK);
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
