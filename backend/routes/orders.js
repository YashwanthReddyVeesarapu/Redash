import express from "express";
import { createOrder, getOrders } from "../data/orders.js";

const router = express.Router();

router.get("/:email", async (req, res) => {
  let email = req.params.email;
  const orders = await getOrders(email);
  res.status(200).json(orders);
});

router.post("/create", async (req, res) => {
  let body = req.body;

  const result = await createOrder(body);
  res.status(200).json(result);
});

export default router;
