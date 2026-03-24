import { getMongoDb } from "./init.database.mongo.js";
import { UserModel } from "./models/user.model.js";

const emailExist = async (email) => {
  let error = null;
  let result = null;

  try {
    await getMongoDb();
    const count = await UserModel.countDocuments({ email });
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
    await getMongoDb();
    const createdUser = await UserModel.create({
      surname,
      email,
      password: hashedPassword,
      role,
    });
    result = { insertedId: createdUser._id };
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
    await getMongoDb();
    result = await UserModel.find({}, { surname: 1, email: 1, role: 1 })
      .sort({ surname: -1 })
      .lean();
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
    await getMongoDb();
    result = await UserModel.findById(id, {
      surname: 1,
      email: 1,
      role: 1,
    }).lean();
  } catch (e) {
    error = e.name === "CastError" ? "ID Mongo invalide" : e.message;
    console.error("Mongo error reading one user:", e);
  } finally {
    return { error, result };
  }
};

const signIn = async (email) => {
  let error = null;
  let result = null;

  try {
    await getMongoDb();
    result = await UserModel.findOne({ email }).lean();
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
    await getMongoDb();
    result = await UserModel.updateOne(
      { _id: id },
      {
        $set: {
          surname,
          email,
          password: hashedPassword,
          role,
        },
      },
    );
  } catch (e) {
    error = e.name === "CastError" ? "ID Mongo invalide" : e.message;
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
