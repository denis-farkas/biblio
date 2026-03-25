import query from "./init.database.js";

// Fonction pour récupérer les commentaire dans la base de données
const readComment = async () => {
  const sql = `
        SELECT *
        FROM comment
        ORDER BY content
    `;

  let error = null;
  let result = null;

  try {
    result = await query(sql);
  } catch (e) {
    error = e.message;
    console.error("Error reading comment:", e);
  } finally {
    return { error, result };
  }
};

// Fonction pour récupérer un seul commentaire
const getUserComment = async (id_comment) => {
  const sql = `
    SELECT t.id_user
    FROM transit t
    WHERE t.id_comment = ?
    LIMIT 1
  `;

  let error = null;
  let idUser = null;

  try {
    const result = await query(sql, [id_comment]);
    idUser = result?.[0]?.id_user ?? null;
  } catch (e) {
    error = e.message;
    console.error("Error reading single comment:", e);
  } finally {
    return { error, idUser };
  }
};

const readCommentByBook = async (id_books) => {
  const sql = `
    SELECT *
    FROM comment
    WHERE id_books = ?
    ORDER BY content
  `;

  let error = null;
  let result = null;

  try {
    result = await query(sql, [id_books]);
  } catch (e) {
    error = e.message;
    console.error("Error reading comments:", e);
  } finally {
    return { error, result };
  }
};

const readCommentByUser = async (id_user) => {
  const sql = `
    SELECT c.*
    FROM comment c
    INNER JOIN transit t ON t.id_comment = c.id_comment
    WHERE t.id_user = ?
    ORDER BY c.content
  `;

  let error = null;
  let result = null;

  try {
    result = await query(sql, [id_user]);
  } catch (e) {
    error = e.message;
    console.error("Error reading comments:", e);
  } finally {
    return { error, result };
  }
};

// Fonction pour créer un commentaire
const createComment = async (
  content,
  created_at,
  verified,
  id_books,
  id_user,
) => {
  const sqlComment = `
    INSERT INTO comment (content, created_at, verified, id_books)
    VALUES (?, ?, ?, ?)
  `;
  const sqlTransit = `
    INSERT INTO transit (id_comment, id_user)
    VALUES (?, ?)
  `;

  let error = null;
  let result = null;

  try {
    if (id_books === undefined || id_books === null) {
      throw new Error("id_books est requis pour créer un commentaire");
    }

    if (id_user === undefined || id_user === null) {
      throw new Error("id_user est requis pour créer un commentaire");
    }

    result = await query(sqlComment, [content, created_at, verified, id_books]);

    const id_comment = result?.insertId;
    if (!id_comment) {
      throw new Error("Impossible de récupérer l'id du commentaire créé");
    }

    await query(sqlTransit, [id_comment, id_user]);

    console.log("Database insert result", result);
  } catch (e) {
    error = e.message;
    console.error("Error insert single comment:", e);
  } finally {
    return { error, result };
  }
};

// Fonction pour modifier un commentaire
const updateComment = async (content, created_at, verified, id_comment) => {
  const sql = `
    UPDATE comment SET content = ?, created_at = ?, verified = ? WHERE id_comment = ?`;

  let error = null;
  let result = null;

  try {
    result = await query(sql, [content, created_at, verified, id_comment]);
    console.log("Database update result", result);
  } catch (e) {
    error = e.message;
    console.error("Error update single comment:", e);
  } finally {
    return { error, result };
  }
};

// Fonction pour supprimer un commentaire
const deleteOneComment = async (id_comment) => {
  const sqlDeleteTransit = `
    DELETE FROM transit
    WHERE id_comment = ?
  `;
  const sqlDeleteComment = `
    DELETE FROM comment
    WHERE id_comment = ?
  `;

  let error = null;
  let result = null;

  try {
    await query(sqlDeleteTransit, [id_comment]);
    result = await query(sqlDeleteComment, [id_comment]);
  } catch (e) {
    error = e.message;
    console.error("Error deleting single comment:", e);
  } finally {
    return { error, result };
  }
};

export const commentDB = {
  readComment,
  getUserComment,
  readCommentByBook,
  readCommentByUser,
  createComment,
  updateComment,
  deleteOneComment,
};
