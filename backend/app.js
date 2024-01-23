import express from "express";
import { constructRoutes } from "./routes/index.js";
import cors from "cors";
import bodyParser from "body-parser";
import "dotenv/config.js";
import nodemailer from "nodemailer";

const port = process.env.PORT || 4000;

const app = express();

app.use(
  cors({
    origin: [
      "https://cloud.redsols.us",
      "https://www.redsols.us",
      "https://blog.redsols.us",
      "https://www.redash.us",
    ],
  })
);

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

async function sendEmail({ eventIds, subject, error }) {
  const valid = ["REDASH <hello@redash.us>", "REDSOLS <hello@redsols.us>"];
  const message = "New Event posted at TAO NYC";
  const TO = "yash@redsols.us";
  const FROM = valid[1];
  let htmlContent = "";
  let events = [];

  async function fetchEventsData(eventIds) {
    let eventsData = [];
    for (let i = 0; i < eventIds.length; i++) {
      const element = eventIds[i];
      let eventsUrl = "https://taogroup.com/wp-json/wp/v2/events/" + element;
      const response = await fetch(eventsUrl);
      const data = await response.json();
      eventsData.push(data);
    }
    return eventsData;
  }
  if (eventIds.length > 0) {
    events = await fetchEventsData(eventIds);
    const eventList = events
      ? events
          .map(
            (event) => `
    <div>
      <h2>${event.title.rendered}</h2>
      <p><strong>Date:</strong> ${event.acf.event_start_date}</p>
      <p><strong>Location:</strong> ${event.acf.event_venue[0].post_title}</p>
      <p>${event.acf.event_description}</p>
      <p><a href="${event.link}" target="_blank">More Info</a></p>
    </div>
  `
          )
          .join("")
      : false;

    htmlContent =
      eventList &&
      `<html>
      <head></head>
      <body>
        <h1>New Events:</h1>
        ${eventList}
      </body>
    </html>`;
  }

  const mailOptions = {
    from: FROM,
    to: TO,
    subject: subject,
    html: events
      ? htmlContent
      : error
      ? error
      : "This is email; to check status",
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Email not sent: " + error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

let existingData = [];
let fullData = [];
let page = 1;

async function getNewData(url) {
  try {
    const response = await fetch(url + "page=" + page);
    const data = await response.json();
    const newEventIds = data.map((event) => event.id);
    fullData.push(...newEventIds);
    if (newEventIds.length == 100) {
      page = page + 1;
      await getNewData(url);
    }

    return fullData;
  } catch (error) {
    throw "Error fetching new data: " + error;
  }
}

async function detectChanges(url, venue) {
  try {
    console.log("Detecting");
    let newData = await getNewData(url); // You'll need to implement getNewData() in JavaScript.
    if (existingData.length === 0) {
      existingData = newData;
      sendEmail({
        eventIds: newData,
        subject: "Test",
      });
    } else {
      console.log("Old Data Size: " + existingData.length);
      console.log("New Data Size: " + newData.length);
      const addedEvents = newData.filter(
        (eventId) => !existingData.includes(eventId)
      );

      if (addedEvents.length > 0) {
        console.log({ "New Events": addedEvents });
        sendEmail({
          eventIds: addedEvents,
          subject: `${venue} Marquee New Event Alert from JS`,
        }); // Send an email with all new events found.
        existingData = newData;
      }
    }
    fullData = [];
    page = 1;
  } catch (error) {
    sendEmail({ subject: "Error Occured", error: error });
  }
}

app.listen(port, (e) => {
  console.log("Server started");

  const minutes = 20;
  const waitTime = 60000 * minutes;
  // const marqueeUrl =
  //   "https://taogroup.com/wp-json/wp/v2/events?per_page=100&filter[meta_key]=end_epoch&filter[meta_value]=1697087581&filter[meta_compare]=%3E=&filter[orderby]=meta_value_num&order=asc&filter[order]=ASC&event_venue=90";

  // const taoNYC =
  //   "https://taogroup.com/wp-json/wp/v2/events?per_page=100&filter[meta_key]=end_epoch&filter[meta_value]=1698636421&filter[meta_compare]=%3E=&filter[orderby]=meta_value_num&order=asc&filter[order]=ASC&event_city=78&";

  // // detectChanges(marqueeUrl, "Marquee");
  // detectChanges(taoNYC, "TAO NYC");

  // setInterval(() => detectChanges(taoNYC, "TAO NYC"), waitTime);

  setInterval(async () => {
    await fetch("https://redtodo-91a009c1eda0.herokuapp.com/");
  }, waitTime);
});
