import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const mongoUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017";
const mongoDbName = process.env.MONGO_DB_NAME || "bibliotheque_mongo";

let client = null;
let db = null;

export const getMongoDb = async () => {
  if (db) {
    return db;
  }

  client = new MongoClient(mongoUri);
  await client.connect();
  db = client.db(mongoDbName);

  return db;
};

export const closeMongoConnection = async () => {
  if (client) {
    await client.close();
    client = null;
    db = null;
  }
};
