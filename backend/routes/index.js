import usersRoute from "./users.js";
import productsRoute from "./products.js";
import configRoute from "./config.js";

export const constructRoutes = (app) => {
  app.use("/users", usersRoute);
  app.use("/products", productsRoute);
  app.use("/config", configRoute);

  app.use("*", (req, res) => {
    res.json({ message: "No matching route found" });
  });
};
