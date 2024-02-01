import { ObjectId } from "mongodb";
import { products } from "../config/mongoCollections.js";

export const createProduct = async (data) => {
  try {
    const productsCollection = await products();

    const insertInfo = await productsCollection.insertOne({ ...data });

    if (!insertInfo.acknowledged || !insertInfo.insertedId)
      throw { status: 400, message: "Could not add product" };

    return { message: "Product inserted" };
  } catch (error) {
    throw { message: "Server error", status: 500 };
  }
};

export const getProductById = async (productId) => {
  try {
    const productsCollection = await products();

    const result = await productsCollection.findOne({
      _id: new ObjectId(productId),
    });

    return result;
  } catch (error) {
    throw { message: "Server error", status: 500 };
  }
};

export const getAllProducts = async (pagenum) => {
  try {
    const PAGE_SIZE = 10;
    const productsCollection = await products();

    let total = await productsCollection.count();

    let results = await productsCollection
      .find({})
      .skip((pagenum - 1) * PAGE_SIZE)
      .limit(PAGE_SIZE)
      .toArray();

    return { total: total, pagenum: pagenum, results: results };
  } catch (error) {
    throw { message: "Server error", status: 500 };
  }
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

export const deleteProduct = async (id) => {
  try {
    const productsCollection = await products();
    const result = await productsCollection.deleteOne({
      _id: new ObjectId(id),
    });
    if (!result.deletedCount)
      throw { status: 400, message: "Could not delete" };
    return { message: "Product deleted" };
  } catch (error) {
    throw { message: "Server error", status: 500 };
  }
};
