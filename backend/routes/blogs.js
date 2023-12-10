import express from "express";
import { getBlog, getBlogs } from "../data/blogs.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const data = await getBlogs();

  console.log(data);

  res.status(200).json(data);
});

router.get("/:title", async (req, res) => {
  const data = await getBlog(req.params.title);

  res.status(200).json(data);
});

router.post("/", async (req, res) => {
  const data = await getBlog(req.params.title);

  res.status(200).json(data);
});

export default router;
