import { dbConnection } from "./monogoConnection.js";

const getCollectionFn = (collection) => {
  let _collection = undefined;

  return async () => {
    if (!_collection) {
      const db = await dbConnection();
      _collection = await db.collection(collection);
    }
    return _collection;
  };
};

const users = getCollectionFn("users");
const products = getCollectionFn("products");
const orders = getCollectionFn("orders");
const blogs = getCollectionFn("blogs");

export { users, products, orders, blogs };
