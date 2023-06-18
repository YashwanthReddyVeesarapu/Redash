import { ObjectId } from "mongodb";
import { users } from "../config/mongoCollections.js";

const getUserById = async (id) => {
  const usersCollection = await users();

  const user = await usersCollection.findOne({ _id: new ObjectId(id) });

  return user;
};

export const createUser = async (userData) => {
  const usersCollection = await users();
  const insertInfo = await usersCollection.insertOne({ ...userData });

  if (!insertInfo.acknowledged || !insertInfo.insertedId)
    throw { status: 400, message: "Could not add users" };

  return { message: "User inserted" };
};
