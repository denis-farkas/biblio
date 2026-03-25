import { ObjectId } from "mongodb";
import { getMongoDb } from "./init.database.mongo.js";

const toObjectId = (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }
  return new ObjectId(id);
};

const readComments = async () => {
  let error = null;
  let result = null;

  try {
    const db = await getMongoDb();
    result = await db
      .collection("comment")
      .find({})
      .sort({ content: 1 })
      .toArray();
  } catch (e) {
    error = e.message;
    console.error("Mongo error reading comment:", e);
  } finally {
    return { error, result };
  }
};

const readOneComment = async (id) => {
  let error = null;
  let result = null;

  try {
    const objectId = toObjectId(id);
    if (!objectId) {
      return { error: "ID Mongo invalide", result: null };
    }

    const db = await getMongoDb();
    result = await db.collection("comment").findOne({ _id: objectId });
  } catch (e) {
    error = e.message;
    console.error("Mongo error reading one comment:", e);
  } finally {
    return { error, result };
  }
};

const createComment = async (
  content,
  created_at,
  verified,
  id_books,
  id_user,
) => {
  let error = null;
  let result = null;

  try {
    const db = await getMongoDb();
    result = await db.collection("comment").insertOne({
      content,
      created_at: created_at || new Date(),
      verified,
      id_books,
      id_user,
    });
  } catch (e) {
    error = e.message;
    console.error("Mongo error creating comment:", e);
  } finally {
    return { error, result };
  }
};

const readCommentByBook = async (id_books) => {
  let error = null;
  let result = null;

  try {
    const db = await getMongoDb();
    result = await db
      .collection("comment")
      .find({ id_books })
      .sort({ content: 1 })
      .toArray();
  } catch (e) {
    error = e.message;
    console.error("Mongo error reading comments by book:", e);
  } finally {
    return { error, result };
  }
};

const readCommentByUser = async (id_user) => {
  let error = null;
  let result = null;

  try {
    const db = await getMongoDb();
    result = await db
      .collection("comment")
      .find({ id_user })
      .sort({ content: 1 })
      .toArray();
  } catch (e) {
    error = e.message;
    console.error("Mongo error reading comments by user:", e);
  } finally {
    return { error, result };
  }
};

const getUserComment = async (id_comment) => {
  let error = null;
  let idUser = null;

  try {
    const objectId = toObjectId(id_comment);
    if (!objectId) {
      return { error: "ID Mongo invalide", idUser: null };
    }

    const db = await getMongoDb();
    const result = await db
      .collection("comment")
      .findOne({ _id: objectId }, { projection: { id_user: 1 } });

    idUser = result?.id_user ?? null;
  } catch (e) {
    error = e.message;
    console.error("Mongo error reading comment owner:", e);
  } finally {
    return { error, idUser };
  }
};

const updateComment = async (content, created_at, verified, id) => {
  let error = null;
  let result = null;

  try {
    const objectId = toObjectId(id);
    if (!objectId) {
      return { error: "ID Mongo invalide", result: null };
    }

    const db = await getMongoDb();
    result = await db.collection("comment").updateOne(
      { _id: objectId },
      {
        $set: {
          content,
          created_at,
          verified,
          updated_at: new Date(),
        },
      },
    );
  } catch (e) {
    error = e.message;
    console.error("Mongo error updating comment:", e);
  } finally {
    return { error, result };
  }
};

const deleteOneComment = async (id) => {
  let error = null;
  let result = null;

  try {
    const objectId = toObjectId(id);
    if (!objectId) {
      return { error: "ID Mongo invalide", result: null };
    }

    const db = await getMongoDb();
    result = await db.collection("comment").deleteOne({ _id: objectId });
  } catch (e) {
    error = e.message;
    console.error("Mongo error deleting comment:", e);
  } finally {
    return { error, result };
  }
};

export const commentMongoDB = {
  readComments,
  readOneComment,
  readCommentByBook,
  readCommentByUser,
  getUserComment,
  createComment,
  updateComment,
  deleteOneComment,
};
