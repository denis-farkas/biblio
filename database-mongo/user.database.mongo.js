import { ObjectId } from "mongodb";
import { getMongoDb } from "./init.database.mongo.js";

const toObjectId = (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }
  return new ObjectId(id);
};

const emailExist = async (email) => {
  let error = null;
  let result = null;

  try {
    const db = await getMongoDb();
    const count = await db.collection("user").countDocuments({ email });
    result = count;
  } catch (e) {
    error = e.message;
    console.error("Mongo error checking email:", e);
  } finally {
    return { error, result };
  }
};

const signUp = async (surname, email, hashedPassword, role) => {
  let error = null;
  let result = null;

  try {
    const db = await getMongoDb();
    result = await db.collection("user").insertOne({
      surname,
      email,
      password: hashedPassword,
      role,
      created_at: new Date(),
    });
  } catch (e) {
    error = e.message;
    console.error("Mongo error signUp:", e);
  } finally {
    return { error, result };
  }
};

const read = async () => {
  let error = null;
  let result = null;

  try {
    const db = await getMongoDb();
    result = await db
      .collection("user")
      .find({}, { projection: { surname: 1, email: 1, role: 1 } })
      .sort({ surname: -1 })
      .toArray();
  } catch (e) {
    error = e.message;
    console.error("Mongo error reading users:", e);
  } finally {
    return { error, result };
  }
};

const readOneUser = async (id) => {
  let error = null;
  let result = null;

  try {
    const objectId = toObjectId(id);
    if (!objectId) {
      return { error: "ID Mongo invalide", result: null };
    }

    const db = await getMongoDb();
    result = await db
      .collection("user")
      .findOne(
        { _id: objectId },
        { projection: { surname: 1, email: 1, role: 1 } },
      );
  } catch (e) {
    error = e.message;
    console.error("Mongo error reading one user:", e);
  } finally {
    return { error, result };
  }
};

const signIn = async (email) => {
  let error = null;
  let result = null;

  try {
    const db = await getMongoDb();
    result = await db.collection("user").findOne({ email });
  } catch (e) {
    error = e.message;
    console.error("Mongo error signIn:", e);
  } finally {
    return { error, result };
  }
};

const updateUser = async (surname, email, hashedPassword, role, id) => {
  let error = null;
  let result = null;

  try {
    const objectId = toObjectId(id);
    if (!objectId) {
      return { error: "ID Mongo invalide", result: null };
    }

    const db = await getMongoDb();
    result = await db.collection("user").updateOne(
      { _id: objectId },
      {
        $set: {
          surname,
          email,
          password: hashedPassword,
          role,
          updated_at: new Date(),
        },
      },
    );
  } catch (e) {
    error = e.message;
    console.error("Mongo error updateUser:", e);
  } finally {
    return { error, result };
  }
};

export const userMongoDB = {
  emailExist,
  signUp,
  read,
  readOneUser,
  signIn,
  updateUser,
};
