import query from "./init.database.js";

// Fonction pour récupérer toutes les livres de la base de données
const readBooks = async () => {
  const sql = `
        SELECT *
        FROM books
        ORDER BY title
    `;

  let error = null;
  let result = null;

  try {
    result = await query(sql);
  } catch (e) {
    error = e.message;
    console.error("Error reading books:", e);
  } finally {
    return { error, result };
  }
};

// Fonction pour récupérer un seul livre en fonction de son ID
const readOneBook = async (id_books) => {
  const sql = `
        SELECT *
        FROM books
        WHERE id_books = ?
    `;

  let error = null;
  let result = null;

  try {
    result = await query(sql, [id_books]);
  } catch (e) {
    error = e.message;
    console.error("Error reading single book:", e);
  } finally {
    return { error, result };
  }
};

// Fonction pour créer un livre
const createBook = async (title, autor, resume, published_at, cover, genre, verified) => {
    const sql = `
    INSERT INTO books (title, autor, resume, published_at, cover, genre, verified) VALUES (?, ?, ?, ?, ?, ?, ?)`;

  let error = null;
  let result = null;

  try {
    result = await query(sql, [title, autor, resume, published_at, cover, genre, verified]);
    console.log("Database insert result",result)
  } catch (e) {
    error = e.message;
    console.error("Error insert single book:", e);
  } finally {
    return { error, result };
  }   
}

// Fonction pour modifier un livre
const updateBook = async (title, autor, resume, published_at, cover, genre, verified, id_books) => {
    const sql = `
    UPDATE books SET title = ?, autor = ?, resume = ?, published_at = ?, cover = ?, genre = ?, verified = ? WHERE id_books = ?`;

  let error = null;
  let result = null;

  try {
    result = await query(sql, [title, autor, resume, published_at, cover, genre, verified, id_books]);
    console.log("Database update result",result)
  } catch (e) {
    error = e.message;
    console.error("Error update single book:", e);
  } finally {
    return { error, result };
  }   
}

// Fonction pour supprimer un livre
const deleteOneBook = async (id_books) => {
  const sql = `
        DELETE FROM books
        WHERE id_books = ?
    `;

  let error = null;
  let result = null;

  try {
    result = await query(sql, [id_books]);
  } catch (e) {
    error = e.message;
    console.error("Error deleting single book:", e);
  } finally {
    return { error, result };
  }
};

export const bookDB = {
    readBooks,
    readOneBook,
    createBook,
    updateBook,
    deleteOneBook
}

