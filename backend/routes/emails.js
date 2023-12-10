import express from "express";
import "dotenv/config.js";

import nodemailer from "nodemailer";
import { sendEmail } from "../data/emails.js";

const router = express.Router();

router.post("/send", async (req, res) => {
  try {
    const { from, to, subject, html } = req.body;

    const result = await sendEmail({
      from: from,
      to: to,
      subject: subject,
      html: html,
    });
    res.status(result.status ? result.status : 200).json(result.message);
  } catch (error) {
    console.log(error);
    res.status(error?.status ? error.status : 500).json(error.message);
  }
});

export default router;
