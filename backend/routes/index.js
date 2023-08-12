import usersRoute from "./users.js";
import productsRoute from "./products.js";
import configRoute from "./config.js";
import ordersRoute from "./orders.js";
import imagesRoute from "./images.js";
import convertRoute from "./convert.js";
import emailRoute from "./emails.js";

export const constructRoutes = (app) => {
  app.use("/users", usersRoute);
  app.use("/products", productsRoute);
  app.use("/config", configRoute);
  app.use("/orders", ordersRoute);
  app.use("/images", imagesRoute);
  app.use("/convert", convertRoute);
  app.use("/email", emailRoute);

  app.use("*", (req, res) => {
    res.json({ message: "This is REDASH API" });
  });
};
