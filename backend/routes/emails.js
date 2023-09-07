import express from "express";
import "dotenv/config.js";

import nodemailer from "nodemailer";
import { sendEmail } from "../data/emails.js";

const router = express.Router();

const transporter = nodemailer.createTransport({
  service: "Gmail", // e.g., 'Gmail'
  auth: {
    user: process.env.EMAIL,
    pass: process.env.E_PASS,
  },
});

router.post("/send", async (req, res) => {
  try {
    const { from, to, subject, html } = req.body;

    const result = await sendEmail({
      from: from,
      to: to,
      subject: subject,
      html: html,
    });
    res.status(result.status).message(result.message);
  } catch (error) {
    res.status(error.status).json(error.message);
  }
});

export default router;
