import { ObjectId } from "mongodb";
import { orders } from "../config/mongoCollections.js";

const getOrderById = async (id) => {
  const ordersCollection = await orders();

  const result = await ordersCollection.findOne({ _id: new ObjectId(id) });

  return result;
};

export const createOrder = async (body) => {
  const ordersCollection = await orders();
  const insertInfo = await ordersCollection.insertOne({
    ...body,
    createdDate: Date.now(),
  });

  return await getOrderById(insertInfo.insertedId);
};

export const getOrders = async (email) => {
  const ordersCollection = await orders();

  const result = await ordersCollection.find({ email: email }).toArray();
  console.log(result);
  return result;
};
