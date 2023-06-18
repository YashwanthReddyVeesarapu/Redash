import express from "express";
import { createUser } from "../data/users.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    let body = req.body;
    console.log(body);
    const insertInfo = await createUser(body);
    res.status(200).json(insertInfo);
  } catch (error) {
    console.log(error);
    res.status(error.status).json(error.message);
  }
});

export default router;
