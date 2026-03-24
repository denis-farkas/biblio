import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const mongoUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017";
const mongoDbName = process.env.MONGO_DB_NAME || "bibliotheque_mongo";

export const getMongoDb = async () => {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection.db;
  }

  await mongoose.connect(mongoUri, {
    dbName: mongoDbName,
  });

  return mongoose.connection.db;
};

export const closeMongoConnection = async () => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }
};
