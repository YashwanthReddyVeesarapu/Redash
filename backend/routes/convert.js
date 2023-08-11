import express from "express";
import multer from "multer";

import fs from "fs";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/webp", upload.single("file"), async (req, res) => {
  let file = req.file;

  if (file) {
    const image = await loadImage(file);
    console.log(image);
    res.send(webpDataURL);
  }
});

export default router;
