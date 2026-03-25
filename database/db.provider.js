import { bookDB as sqlBookDB } from "./book.database.js";
import { genreDB as sqlGenreDB } from "./genre.database.js";
import { UserDB as sqlUserDB } from "./user.database.js";
import { commentDB as sqlCommentDB } from "./comment.database.js";

import { bookMongoDB } from "../database-mongo/book.database.mongo.js";
import { genreMongoDB } from "../database-mongo/genre.database.mongo.js";
import { userMongoDB } from "../database-mongo/user.database.mongo.js";
import { commentMongoDB } from "../database-mongo/comment.database.mongo.js";

const useMongo =
  String(process.env.USE_MONGO || "false").toLowerCase() === "true";

const normalizeInsert = (mongoResult) => ({
  insertId: mongoResult?.insertedId ? String(mongoResult.insertedId) : null,
});

const normalizeUpdateDelete = (mongoResult) => ({
  affectedRows: mongoResult?.modifiedCount ?? mongoResult?.deletedCount ?? 0,
});

const normalizeMongoBook = (doc) => ({
  id_books: String(doc?._id),
  title: doc?.title,
  autor: doc?.autor,
  resume: doc?.resume,
  published_at: doc?.published_at,
  cover: doc?.cover,
  genre: doc?.genre,
  verified: doc?.verified,
});

const normalizeMongoGenre = (doc) => ({
  id_genre: String(doc?._id),
  genre_name: doc?.genre_name,
});

const normalizeMongoUser = (doc) => ({
  id_user: String(doc?._id),
  surname: doc?.surname,
  email: doc?.email,
  role: doc?.role,
  password: doc?.password,
});

const normalizeMongoComment = (doc) => ({
  id_comment: String(doc?._id),
  content: doc?.content,
  created_at: doc?.created_at,
  verified: doc?.verified,
  updated_at: doc?.updated_at,
});

const mongoBookAdapter = {
  readBooks: async () => {
    const response = await bookMongoDB.readBooks();
    return {
      error: response.error,
      result: Array.isArray(response.result)
        ? response.result.map(normalizeMongoBook)
        : [],
    };
  },
  readOneBook: async (id) => {
    const response = await bookMongoDB.readOneBook(id);
    return {
      error: response.error,
      result: response.result ? [normalizeMongoBook(response.result)] : [],
    };
  },
  createBook: async (...args) => {
    const response = await bookMongoDB.createBook(...args);
    return {
      error: response.error,
      result: normalizeInsert(response.result),
    };
  },
  updateBook: async (...args) => {
    const response = await bookMongoDB.updateBook(...args);
    return {
      error: response.error,
      result: normalizeUpdateDelete(response.result),
    };
  },
  deleteOneBook: async (id) => {
    const response = await bookMongoDB.deleteOneBook(id);
    return {
      error: response.error,
      result: normalizeUpdateDelete(response.result),
    };
  },
};

const mongoGenreAdapter = {
  readGenre: async () => {
    const response = await genreMongoDB.readGenre();
    return {
      error: response.error,
      result: Array.isArray(response.result)
        ? response.result.map(normalizeMongoGenre)
        : [],
    };
  },
  readOneGenre: async (id) => {
    const response = await genreMongoDB.readOneGenre(id);
    return {
      error: response.error,
      result: response.result ? [normalizeMongoGenre(response.result)] : [],
    };
  },
  createGenre: async (genre_name) => {
    const response = await genreMongoDB.createGenre(genre_name);
    return {
      error: response.error,
      result: normalizeInsert(response.result),
    };
  },
  updateGenre: async (genre_name, id) => {
    const response = await genreMongoDB.updateGenre(genre_name, id);
    return {
      error: response.error,
      result: normalizeUpdateDelete(response.result),
    };
  },
  deleteGenre: async (id) => {
    const response = await genreMongoDB.deleteGenre(id);
    return {
      error: response.error,
      result: normalizeUpdateDelete(response.result),
    };
  },
};

const mongoUserAdapter = {
  emailExist: async (email) => {
    const response = await userMongoDB.emailExist(email);
    return {
      error: response.error,
      result: response.result,
    };
  },
  signUp: async (...args) => {
    const response = await userMongoDB.signUp(...args);
    return {
      error: response.error,
      result: normalizeInsert(response.result),
    };
  },
  read: async () => {
    const response = await userMongoDB.read();
    return {
      error: response.error,
      result: Array.isArray(response.result)
        ? response.result.map((u) => {
            const normalized = normalizeMongoUser(u);
            return {
              id_user: normalized.id_user,
              surname: normalized.surname,
              email: normalized.email,
              role: normalized.role,
            };
          })
        : [],
    };
  },
  readOneUser: async (id) => {
    const response = await userMongoDB.readOneUser(id);
    if (!response.result) {
      return { error: response.error, result: [] };
    }

    const normalized = normalizeMongoUser(response.result);
    return {
      error: response.error,
      result: [
        {
          surname: normalized.surname,
          email: normalized.email,
          role: normalized.role,
        },
      ],
    };
  },
  signIn: async (email) => {
    const response = await userMongoDB.signIn(email);
    if (!response.result) {
      return { error: response.error, result: [] };
    }

    return {
      error: response.error,
      result: [normalizeMongoUser(response.result)],
    };
  },
  updateUser: async (...args) => {
    const response = await userMongoDB.updateUser(...args);
    return {
      error: response.error,
      result: normalizeUpdateDelete(response.result),
    };
  },
};

const mongoCommentAdapter = {
  readComment: async () => {
    const response = await commentMongoDB.readComments();
    return {
      error: response.error,
      result: Array.isArray(response.result)
        ? response.result.map(normalizeMongoComment)
        : [],
    };
  },
  readOneComment: async (id) => {
    const response = await commentMongoDB.readOneComment(id);
    return {
      error: response.error,
      result: response.result ? [normalizeMongoComment(response.result)] : [],
    };
  },
  readCommentByBook: async (id_books) => {
    const response = await commentMongoDB.readCommentByBook(id_books);
    return {
      error: response.error,
      result: Array.isArray(response.result)
        ? response.result.map(normalizeMongoComment)
        : [],
    };
  },
  readCommentByUser: async (id_user) => {
    const response = await commentMongoDB.readCommentByUser(id_user);
    return {
      error: response.error,
      result: Array.isArray(response.result)
        ? response.result.map(normalizeMongoComment)
        : [],
    };
  },
  getUserComment: async (id_comment) => {
    const response = await commentMongoDB.getUserComment(id_comment);
    return {
      error: response.error,
      idUser: response.idUser,
    };
  },
  createComment: async (...args) => {
    const response = await commentMongoDB.createComment(...args);
    return {
      error: response.error,
      result: normalizeInsert(response.result),
    };
  },
  updateComment: async (...args) => {
    const response = await commentMongoDB.updateComment(...args);
    return {
      error: response.error,
      result: normalizeUpdateDelete(response.result),
    };
  },
  deleteOneComment: async (id) => {
    const response = await commentMongoDB.deleteOneComment(id);
    return {
      error: response.error,
      result: normalizeUpdateDelete(response.result),
    };
  },
};

export const bookDB = useMongo ? mongoBookAdapter : sqlBookDB;
export const genreDB = useMongo ? mongoGenreAdapter : sqlGenreDB;
export const UserDB = useMongo ? mongoUserAdapter : sqlUserDB;
export const commentDB = useMongo ? mongoCommentAdapter : sqlCommentDB;
