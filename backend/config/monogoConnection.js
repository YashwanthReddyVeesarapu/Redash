import { MongoClient } from "mongodb";

import settings from "./settings.json" assert { type: "json" };

let _connection = undefined;
let _db = undefined;

const dbConnection = async () => {
  if (!_connection) {
    _connection = await MongoClient.connect(
      `mongodb+srv://yash:${process.env.DB_PASS}@cluster0.gqrwztc.mongodb.net/?retryWrites=true&w=majority`
    );
    _db = await _connection.db(settings.mongoConfig.database);
  }
  return _db;
};

const closeConnection = () => {
  _connection.close();
};

export { dbConnection, closeConnection };
