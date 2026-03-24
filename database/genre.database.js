import query from "./init.database.js";

const createGenre = async (genre_name) => {
    const sql = `
    INSERT INTO genre (genre_name) VALUES (?)`;

  let error = null;
  let result = null;

  try {
    result = await query(sql, [genre_name]);
    console.log("Database insert result",result)
  } catch (e) {
    error = e.message;
    console.error("Error insert genre:", e);
  } finally {
    return { error, result };
  }   
}

const readGenre = async () => {
  const sql = `
        SELECT *
        FROM genre
        ORDER BY genre_name
    `;

  let error = null;
  let result = null;

  try {
    result = await query(sql);
  } catch (e) {
    error = e.message;
    console.error("Error reading genre:", e);
  } finally {
    return { error, result };
  }
};

const readOneGenre = async (id_genre) => {
  const sql = `
        SELECT *
        FROM genre
        WHERE id_genre = ?
    `;

  let error = null;
  let result = null;

  try {
    result = await query(sql, [id_genre]);
  } catch (e) {
    error = e.message;
    console.error("Error reading single genre:", e);
  } finally {
    return { error, result };
  }
};

const updateGenre = async (genre_name, id_genre) => {
    const sql = 
    `UPDATE genre SET genre_name = ?
     WHERE id_genre = ?`;

  let error = null;
  let result = null;

  try {
    result = await query(sql, [genre_name, id_genre]);
    console.log("Database update result",result)
  } catch (e) {
    error = e.message;
    console.error("Error update single genre:", e);
  } finally {
    return { error, result };
  }   
}

const deleteGenre = async (id_genre) => {
  const sql = `
        DELETE FROM genre
        WHERE id_genre = ?
    `;

  let error = null;
  let result = null;

  try {
    result = await query(sql, [id_genre]);
  } catch (e) {
    error = e.message;
    console.error("Error deleting genre:", e);
  } finally {
    return { error, result };
  }
};

export const genreDB = {
    readGenre,
    readOneGenre,
    createGenre,
    updateGenre,
    deleteGenre
}