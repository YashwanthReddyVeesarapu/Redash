import { ObjectId } from "mongodb";
import { orders } from "../config/mongoCollections.js";

const getOrderById = async (id) => {
  try {
    const ordersCollection = await orders();

    const result = await ordersCollection.findOne({ _id: new ObjectId(id) });

    return result;
  } catch (error) {
    throw { status: 500, message: "Server Error" };
  }
};

export const createOrder = async (body) => {
  try {
    const ordersCollection = await orders();
    const insertInfo = await ordersCollection.insertOne({
      ...body,
      createdDate: Date.now(),
    });

    return await getOrderById(insertInfo.insertedId);
  } catch (error) {
    throw { status: 500, message: "Server Error" };
  }
};

export const getAllOrders = async () => {
  try {
    const ordersCollection = await orders();
    const result = await ordersCollection
      .find({})
      .sort({ createdDate: -1 })
      .toArray();
    return result;
  } catch (error) {
    throw { status: 500, message: "Server Error" };
  }
};

export const getOrders = async (email) => {
  try {
    const ordersCollection = await orders();
    const result = await ordersCollection.find({ email: email }).toArray();
    return result;
  } catch (error) {
    throw { status: 500, message: "Server Error" };
  }
};
