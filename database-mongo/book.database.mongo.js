import { getMongoDb } from "./init.database.mongo.js";
import { BookModel } from "./models/book.model.js";

const readBooks = async () => {
  let error = null;
  let result = null;

  try {
    await getMongoDb();
    result = await BookModel.find({}).sort({ title: 1 }).lean();
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
    await getMongoDb();
    result = await BookModel.findById(id).lean();
  } catch (e) {
    error = e.name === "CastError" ? "ID Mongo invalide" : e.message;
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
    await getMongoDb();
    const createdBook = await BookModel.create({
      title,
      autor,
      resume,
      published_at,
      cover,
      genre,
      verified,
    });
    result = { insertedId: createdBook._id };
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
    await getMongoDb();
    result = await BookModel.updateOne(
      { _id: id },
      {
        $set: {
          title,
          autor,
          resume,
          published_at,
          cover,
          genre,
          verified,
        },
      },
    );
  } catch (e) {
    error = e.name === "CastError" ? "ID Mongo invalide" : e.message;
    console.error("Mongo error updating book:", e);
  } finally {
    return { error, result };
  }
};

const deleteOneBook = async (id) => {
  let error = null;
  let result = null;

  try {
    await getMongoDb();
    result = await BookModel.deleteOne({ _id: id });
  } catch (e) {
    error = e.name === "CastError" ? "ID Mongo invalide" : e.message;
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
