import express from "express";
import { constructRoutes } from "./routes/index.js";
import cors from "cors";
import bodyParser from "body-parser";
import "dotenv/config.js";
const port = process.env.PORT || 4000;

const app = express();
app.use(cors());

app.use(bodyParser.json({ limit: "16mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "16mb" }));

constructRoutes(app);

app.listen(port, (e) => {
  console.log("Server started");
});
