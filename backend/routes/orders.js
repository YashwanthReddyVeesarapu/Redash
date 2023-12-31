import express from "express";
import { createOrder, getOrders } from "../data/orders.js";
import { sendEmail } from "../data/emails.js";

const router = express.Router();

router.get("/:email", async (req, res) => {
  let email = req.params.email;
  const orders = await getOrders(email);
  res.status(200).json(orders);
});

router.post("/create", async (req, res) => {
  try {
    let body = req.body;

    const result = await createOrder(body);

    const emailStatus = await sendEmail({
      from: "REDASH <hello@redash.us>",
      to: "hello@redash.us",
      html: `<h1>New order Recived</h1>`,
      subject: "New Order: REDASH",
    });

    res.status(200).json(result);
  } catch (error) {
    res.status(error.status).json(error.message);
  }
});

export default router;
