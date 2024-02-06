import express from "express";
import { createOrder, getAllOrders, getOrders } from "../data/orders.js";
import { sendEmail } from "../data/emails.js";

const router = express.Router();

router.get("/:email", async (req, res) => {
  let email = req.params.email;
  const orders = await getOrders(email);
  res.status(200).json(orders);
});

router.get("/", async (req, res) => {
  let token = req.headers.authorization;
  token = token.split(" ")[1];
  if (token !== process.env.TOKEN) {
    return res.status(401).json("Unauthorized");
  } else {
    const orders = await getAllOrders();
    return res.status(200).json(orders);
  }
});

const createHtmlEmail = (body) => {
  const { shipping, contact, orderItems, total } = body;
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Order Confirmation</title>
    </head>
    <body>
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px;">
    <h2>Order Confirmation</h2>

    <h3>Shipping Details</h3>
    <p><strong>Name:</strong> ${shipping.name}</p>
    <p><strong>Address:</strong> ${shipping.address.line1}, ${
    shipping.address.city
  }, ${shipping.address.state} ${shipping.address.postal_code}, ${
    shipping.address.country
  }</p>

    <h3>Contact Information</h3>
    <p><strong>Name:</strong> ${contact.name}</p>
    <p><strong>Email:</strong> ${contact.email}</p>

    <h3>Order Items</h3>
    <ul>
        <!-- Loop through order items -->
        ${orderItems.map((item, i) => {
          return `
            <li>
                <img src="https://api.redash.us/images/${item._id}?color=${item.color}" alt="Product Image" style="max-width: 100px;">
                <p><strong>Product:</strong> ${item.name}</p>
                <p><strong>Quantity:</strong> ${item.quantity}</p>
                <p><strong>Color:</strong> ${item.color}</p>
                <p><strong>Size:</strong> ${item.size}</p>
                <p><strong>Price:</strong> $${item.price}</p>
            </li>
        `;
        })}
    </ul>

    <h3>Total</h3>
    <p><strong>Total Amount:</strong> $${total}</p>

    <p>Thank you for shopping with us!</p>
    </div>
    </body>
    </html>`;
};

router.post("/create", async (req, res) => {
  try {
    let body = req.body;

    console.log(body);

    const result = await createOrder(body);

    const emailStatus = await sendEmail({
      from: "REDASH <hello@redash.us>",
      to: "hello@redash.us",
      html: createHtmlEmail(body),
      subject: "New Order Received: REDASH",
    });

    const customerEmailStatus = await sendEmail({
      from: "REDASH <hello@redash.us>",
      to: body.contact.email,
      html: createHtmlEmail(body),
      subject: "REDASH: Order Confirmation",
    });

    res.status(200).json(result);
  } catch (error) {
    res.status(error.status).json(error.message);
  }
});

export default router;
