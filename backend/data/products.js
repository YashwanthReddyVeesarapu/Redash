import { ObjectId } from "mongodb";
import { products } from "../config/mongoCollections.js";

export const createProduct = async (data) => {
  const productsCollection = await products();

  const insertInfo = await productsCollection.insertOne({ ...data });

  if (!insertInfo.acknowledged || !insertInfo.insertedId)
    throw { status: 400, message: "Could not add product" };

  return { message: "Product inserted" };
};

export const getProductById = async (productId) => {
  const productsCollection = await products();

  const result = await productsCollection.findOne({
    _id: new ObjectId(productId),
  });

  return result;
};

export const getAllProducts = async (pagenum) => {
  const PAGE_SIZE = 10;
  const productsCollection = await products();

  let total = await productsCollection.count();

  let results = await productsCollection
    .find({})
    .skip((pagenum - 1) * PAGE_SIZE)
    .limit(PAGE_SIZE)
    .toArray();

  return { total: total, pagenum: pagenum, results: results };
};

export const searchProducts = async (query) => {
  try {
    const productsCollection = await products();
    let results = await productsCollection
      .aggregate([
        {
          $search: {
            index: "default",
            text: {
              query: query,
              path: {
                wildcard: "*",
              },
            },
          },
        },
      ])
      .toArray();
    return { results: results };
  } catch (error) {
    console.log(error);
    throw { message: "Server error", status: 500 };
  }
};
