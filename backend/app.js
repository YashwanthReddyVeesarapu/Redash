import express from "express";
import { constructRoutes } from "./routes/index.js";
import cors from "cors";
import bodyParser from "body-parser";
import "dotenv/config.js";
import nodemailer from "nodemailer";

const port = process.env.PORT || 4000;

const app = express();

app.use(cors());

app.use(bodyParser.json({ limit: "16mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "16mb" }));

//Logging Middileware
app.use((req, res, next) => {
  const now = new Date();
  const options = {
    timeZone: "America/New_York",
    hour12: true,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };
  const etDateTime = now.toLocaleString("en-US", options);
  const logMessage = `Time: ${etDateTime}; Method: ${req.method}; Url: ${req.url}`;
  console.log(logMessage);
  next();
});

constructRoutes(app);

const transporter = nodemailer.createTransport({
  service: "Gmail", // e.g., 'Gmail'
  auth: {
    user: process.env.EMAIL, // Replace with your email
    pass: process.env.E_PASS, // Replace with your email password
  },
});

function sendEmail() {
  const valid = ["REDASH <hello@redash.us>", "REDSOLS <hello@redsols.us>"];
  const message = "New Event posted at marquee";
  const TO = "yash@redsols.us";
  const FROM = valid[1];

  const mailOptions = {
    from: FROM,
    to: TO,
    subject: "Marquee Event Alert",
    text: message,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Email not sent: " + error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

async function getNewData(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    const newEventIds = data.map((event) => event.id);
    return newEventIds;
  } catch (error) {
    console.error("Error fetching new data: " + error);
    return [];
  }
}

let existingData = [];

async function detectChanges(url) {
  console.log("Detecting");
  console.log(existingData.length);
  let newData = await getNewData(url); // You'll need to implement getNewData() in JavaScript.

  if (existingData.length === 0) {
    existingData = newData;
    console.log(newData);
    sendEmail();
  } else {
    if (existingData.length === newData.length) {
      existingData.sort();
      newData.sort();
      for (let i = 0; i < existingData.length; i++) {
        if (existingData[i] !== newData[i]) {
          sendEmail(); // You'll need to implement sendEmail() in JavaScript.
          break;
        }
      }
    } else {
      sendEmail(); // You'll need to implement sendEmail() in JavaScript.
    }
  }
  existingData = newData;
  console.log(existingData);
}

app.listen(port, (e) => {
  console.log("Server started");

  const minutes = 5;
  const waitTime = 60000 * minutes;
  const url =
    "https://taogroup.com/wp-json/wp/v2/events?per_page=100&filter[meta_key]=end_epoch&filter[meta_value]=1697087581&filter[meta_compare]=%3E=&filter[orderby]=meta_value_num&order=asc&filter[order]=ASC&event_venue=90";

  setInterval(() => detectChanges(url), waitTime);
});
