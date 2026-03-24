import { getMongoDb } from "./init.database.mongo.js";
import { GenreModel } from "./models/genre.model.js";

const createGenre = async (genre_name) => {
  let error = null;
  let result = null;

  try {
    await getMongoDb();
    const createdGenre = await GenreModel.create({
      genre_name,
    });
    result = { insertedId: createdGenre._id };
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
    await getMongoDb();
    result = await GenreModel.find({}).sort({ genre_name: 1 }).lean();
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
    await getMongoDb();
    result = await GenreModel.findById(id).lean();
  } catch (e) {
    error = e.name === "CastError" ? "ID Mongo invalide" : e.message;
    console.error("Mongo error reading one genre:", e);
  } finally {
    return { error, result };
  }
};

const updateGenre = async (genre_name, id) => {
  let error = null;
  let result = null;

  try {
    await getMongoDb();
    result = await GenreModel.updateOne(
      { _id: id },
      {
        $set: {
          genre_name,
        },
      },
    );
  } catch (e) {
    error = e.name === "CastError" ? "ID Mongo invalide" : e.message;
    console.error("Mongo error updating genre:", e);
  } finally {
    return { error, result };
  }
};

const deleteGenre = async (id) => {
  let error = null;
  let result = null;

  try {
    await getMongoDb();
    result = await GenreModel.deleteOne({ _id: id });
  } catch (e) {
    error = e.name === "CastError" ? "ID Mongo invalide" : e.message;
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
