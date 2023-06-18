import express from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
} from "../data/products.js";

const router = express.Router();

router.get("/:pagenum", async (req, res) => {
  try {
    let pagenum = req.params.pagenum;
    const data = await getAllProducts(pagenum);
    res.status(200).json(data);
  } catch (error) {
    res.status(error.status).json(error.message);
  }
});

router.get("/product/:productId", async (req, res) => {
  try {
    let productId = req.params.productId;
    const data = await getProductById(productId);
    res.status(200).json(data);
  } catch (error) {
    res.status(error.status).json(error.message);
  }
});

router.post("/", async (req, res) => {
  try {
    let body = req.body;
    const insertInfo = await createProduct(body);
    res.status(200).json(insertInfo);
  } catch (error) {
    res.status(error.status).json(error.message);
  }
});

export default router;
