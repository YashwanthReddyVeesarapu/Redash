import "dotenv/config.js";

import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.E_PASS,
  },
});

export const sendEmail = async ({ from, to, subject, html }) => {
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
      throw { status: 500, message: "Failed to send email" };
    }
  });
  return { status: 200, message: "Email sent successfully" };
};
