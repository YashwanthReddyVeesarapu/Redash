import { ObjectId } from "mongodb";
import { users } from "../config/mongoCollections.js";

import bcrypt from "bcrypt";

const getUserByEmail = async (email) => {
  const usersCollection = await users();

  const user = await usersCollection.findOne({ email: email });

  return user;
};

const getUserById = async (id) => {
  const usersCollection = await users();

  const user = await usersCollection.findOne({ _id: new ObjectId(id) });

  delete user.password;

  if (user == null) throw "User not found";

  return user;
};

export const createUser = async (userData) => {
  const usersCollection = await users();

  const userCheck = await getUserByEmail(userData.email);
  if (userCheck != null) throw { status: 400, message: "Email already in use" };

  const insertInfo = await usersCollection.insertOne({ ...userData });

  if (!insertInfo.acknowledged || !insertInfo.insertedId)
    throw { status: 400, message: "Could not add users" };

  return await getUserById(insertInfo.insertedId);
};

export const userLogin = async (userInput) => {
  const { email, password } = userInput;
  let validPassword;

  try {
    const user = await getUserByEmail(email);
    validPassword = await bcrypt.compare(password, user.password);
  } catch (error) {
    throw error;
  }

  if (validPassword) return { status: 200, ...user };
  else throw { status: 401, msg: "Error: Invalid Username or Password" };
};
