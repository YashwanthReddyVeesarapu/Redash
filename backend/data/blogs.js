import { blogs } from "../config/mongoCollections.js";

export const getBlogs = async () => {
  const blogsCollection = await blogs();

  const data = await blogsCollection.find({}).toArray();
  console.log(data);

  return data;
};

export const getBlog = async (title) => {
  const blogsCollection = await blogs();

  title = title.replaceAll("-", " ");

  const data = await blogsCollection.findOne({ title: title });
  console.log(data);
  return data;
};

export const createBlog = async (data) => {
  const blogsCollection = await blogs();

  const insertInfo = await blogsCollection.insertOne(data);

  if (!insertInfo.acknowledged || !insertInfo.insertedId)
    throw { status: 400, message: "Could not add blog" };
  return insertInfo._id;
};
