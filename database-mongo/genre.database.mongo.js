import { ObjectId } from "mongodb";
import { getMongoDb } from "./init.database.mongo.js";

const toObjectId = (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }
  return new ObjectId(id);
};

const createGenre = async (genre_name) => {
  let error = null;
  let result = null;

  try {
    const db = await getMongoDb();
    result = await db.collection("genre").insertOne({
      genre_name,
      created_at: new Date(),
    });
  } catch (e) {
    error = e.message;
    console.error("Mongo error creating genre:", e);
  } finally {
    return { error, result };
  }
};

const readGenre = async () => {
  let error = null;
  let result = null;

  try {
    const db = await getMongoDb();
    result = await db
      .collection("genre")
      .find({})
      .sort({ genre_name: 1 })
      .toArray();
  } catch (e) {
    error = e.message;
    console.error("Mongo error reading genre:", e);
  } finally {
    return { error, result };
  }
};

const readOneGenre = async (id) => {
  let error = null;
  let result = null;

  try {
    const objectId = toObjectId(id);
    if (!objectId) {
      return { error: "ID Mongo invalide", result: null };
    }

    const db = await getMongoDb();
    result = await db.collection("genre").findOne({ _id: objectId });
  } catch (e) {
    error = e.message;
    console.error("Mongo error reading one genre:", e);
  } finally {
    return { error, result };
  }
};

const updateGenre = async (genre_name, id) => {
  let error = null;
  let result = null;

  try {
    const objectId = toObjectId(id);
    if (!objectId) {
      return { error: "ID Mongo invalide", result: null };
    }

    const db = await getMongoDb();
    result = await db.collection("genre").updateOne(
      { _id: objectId },
      {
        $set: {
          genre_name,
          updated_at: new Date(),
        },
      },
    );
  } catch (e) {
    error = e.message;
    console.error("Mongo error updating genre:", e);
  } finally {
    return { error, result };
  }
};

const deleteGenre = async (id) => {
  let error = null;
  let result = null;

  try {
    const objectId = toObjectId(id);
    if (!objectId) {
      return { error: "ID Mongo invalide", result: null };
    }

    const db = await getMongoDb();
    result = await db.collection("genre").deleteOne({ _id: objectId });
  } catch (e) {
    error = e.message;
    console.error("Mongo error deleting genre:", e);
  } finally {
    return { error, result };
  }
};

export const genreMongoDB = {
  createGenre,
  readGenre,
  readOneGenre,
  updateGenre,
  deleteGenre,
};
