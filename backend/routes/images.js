import express from "express";
import { products } from "../config/mongoCollections.js";
import { ObjectId } from "mongodb";

const router = express.Router();

router.get("/:id", async (req, res) => {
  try {
    let { color } = req.query;

    const productsCollection = await products();

    const product = await productsCollection.findOne({
      _id: new ObjectId(req.params.id),
    });

    let imgIndex;
    if (color) {
      const keys = Object.keys(product.images);
      imgIndex = keys.indexOf(color);
    }

    const images = Object.values(product.images);

    let base64Data = images[imgIndex != -1 ? imgIndex : 0].replace(
      /^data:image\/webp;base64,/,
      ""
    );

    var img = Buffer.from(base64Data, "base64");

    res.writeHead(200, {
      "Content-Type": "image/webp",
      "Content-Length": img.length,
    });
    res.end(img);
  } catch (error) {
    res.status(error.staus).json(error.message);
  }
});

export default router;
