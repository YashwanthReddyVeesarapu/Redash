import express from "express";
import { createUser, userLogin } from "../data/users.js";

import bcrypt from "bcrypt";

const router = express.Router();

router.post("/create", async (req, res) => {
  try {
    let body = req.body;
    console.log(body);
    const salt = await bcrypt.genSalt(10);

    let hashpass = await bcrypt.hash(body.password, salt);
    body.password = hashpass;

    const insertInfo = await createUser(body);
    res.status(200).json(insertInfo);
  } catch (error) {
    console.log(error);
    res.status(error.status).json(error.message);
  }
});

router.post("/login", async (req, res) => {
  try {
    let body = req.body;

    const userInfo = await userLogin(body);
    res.status(200).json(userInfo);
  } catch (error) {
    console.log(error);
    res.status(error.status).json(error.message);
  }
});

export default router;
