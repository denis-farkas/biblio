import { ObjectId } from "mongodb";
import { getMongoDb } from "./init.database.mongo.js";

const toObjectId = (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }
  return new ObjectId(id);
};

const readBooks = async () => {
  let error = null;
  let result = null;

  try {
    const db = await getMongoDb();
    result = await db.collection("books").find({}).sort({ title: 1 }).toArray();
  } catch (e) {
    error = e.message;
    console.error("Mongo error reading books:", e);
  } finally {
    return { error, result };
  }
};

const readOneBook = async (id) => {
  let error = null;
  let result = null;

  try {
    const objectId = toObjectId(id);
    if (!objectId) {
      return { error: "ID Mongo invalide", result: null };
    }

    const db = await getMongoDb();
    result = await db.collection("books").findOne({ _id: objectId });
  } catch (e) {
    error = e.message;
    console.error("Mongo error reading one book:", e);
  } finally {
    return { error, result };
  }
};

const createBook = async (
  title,
  autor,
  resume,
  published_at,
  cover,
  genre,
  verified,
) => {
  let error = null;
  let result = null;

  try {
    const db = await getMongoDb();
    result = await db.collection("books").insertOne({
      title,
      autor,
      resume,
      published_at,
      cover,
      genre,
      verified,
      created_at: new Date(),
    });
  } catch (e) {
    error = e.message;
    console.error("Mongo error creating book:", e);
  } finally {
    return { error, result };
  }
};

const updateBook = async (
  title,
  autor,
  resume,
  published_at,
  cover,
  genre,
  verified,
  id,
) => {
  let error = null;
  let result = null;

  try {
    const objectId = toObjectId(id);
    if (!objectId) {
      return { error: "ID Mongo invalide", result: null };
    }

    const db = await getMongoDb();
    result = await db.collection("books").updateOne(
      { _id: objectId },
      {
        $set: {
          title,
          autor,
          resume,
          published_at,
          cover,
          genre,
          verified,
          updated_at: new Date(),
        },
      },
    );
  } catch (e) {
    error = e.message;
    console.error("Mongo error updating book:", e);
  } finally {
    return { error, result };
  }
};

const deleteOneBook = async (id) => {
  let error = null;
  let result = null;

  try {
    const objectId = toObjectId(id);
    if (!objectId) {
      return { error: "ID Mongo invalide", result: null };
    }

    const db = await getMongoDb();
    result = await db.collection("books").deleteOne({ _id: objectId });
  } catch (e) {
    error = e.message;
    console.error("Mongo error deleting book:", e);
  } finally {
    return { error, result };
  }
};

export const bookMongoDB = {
  readBooks,
  readOneBook,
  createBook,
  updateBook,
  deleteOneBook,
};
