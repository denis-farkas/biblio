import mysql from "mysql2/promise";
async function seedGenre() {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "bibliotheque",
  });
  const genres = [
    "Roman",
    "Science-fiction",
    "Fantastique",
    "Policier",
    "Biographie",
    "Histoire",
  ];
  // ON DUPLICATE KEY UPDATE évite les doublons si name est UNIQUE
  const sql = `
    INSERT INTO genre (genre_name)
    VALUES (?)
    ON DUPLICATE KEY UPDATE genre_name = VALUES(genre_name)
  `;
  for (const g of genres) {
    await connection.execute(sql, [g]);
  }
  console.log("Table genre alimentée avec succès.");
  await connection.end();
}
seedGenre().catch((err) => {
  console.error("Erreur seed genre:", err);
  process.exit(1);
});