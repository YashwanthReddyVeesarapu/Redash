import express from "express";
import "dotenv/config.js";

import nodemailer from "nodemailer";

const router = express.Router();

const transporter = nodemailer.createTransport({
  service: "Gmail", // e.g., 'Gmail'
  auth: {
    user: process.env.EMAIL,
    pass: process.env.E_PASS,
  },
});

router.post("/send", (req, res) => {
  try {
    const { from, to, subject, html } = req.body;

    let valid = ["REDASH <hello@redash.us>", "REDSOLS <hello@redsols.us>"];

    if (valid.indexOf(from) < 0) {
      throw { message: "Bad credentials", status: 400 };
    }

    const mailOptions = {
      from: from,
      to: to,
      subject: subject,
      html: html,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        res.status(500).send("Failed");
      } else {
        console.log("Email sent:", info.response);
        res.status(200).send("Email sent successfully");
      }
    });
  } catch (error) {
    res.status(error.status).json(error.message);
  }
});

export default router;
