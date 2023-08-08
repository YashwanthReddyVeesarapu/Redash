import usersRoute from "./users.js";
import productsRoute from "./products.js";
import configRoute from "./config.js";
import ordersRoute from "./orders.js";
import imagesRoute from "./images.js";

export const constructRoutes = (app) => {
  app.use("/users", usersRoute);
  app.use("/products", productsRoute);
  app.use("/config", configRoute);
  app.use("/orders", ordersRoute);
  app.use("/images", imagesRoute);

  app.use("*", (req, res) => {
    res.json({ message: "No matching route found" });
  });
};
