import query from "./init.database.js";

// Fonction pour vérifier l'existence d'un email dans la base de données
const emailExist = async (email) => {
  const sql = ` SELECT COUNT(*) as count from user where email= ?`;
  let result = await query(sql, [email]);

  result = result[0].count;

  return { result };
};

// Fonction pour créer un nouvel utilisateur dans la base de données
const signUp = async (surname, email, hashedPassword, role) => {
  const sql = `
  INSERT INTO user (surname, email, password, role) 
   VALUES (?, ?, ?, ?)`;

  let error = null;
  let result = null;

  try {
    // Exécution de la requête SQL pour créer un nouvel utilisateur
    result = await query(sql, [surname, email, hashedPassword, role]);
  } catch (e) {
    // Capture de l'erreur en cas d'échec de l'exécution de la requête
    error = e.message;
  } finally {
    // Retour d'un objet contenant l'erreur (le cas échéant) et le résultat de la requête
    return { error, result };
  }
};

// Fonction asynchrone pour lire les informations de certains champs des utilisateurs depuis la base de données
const read = async () => {
  // Requête SQL pour sélectionner les champs spécifiés de la table "users"
  const sql = `
      SELECT id_user, surname, email, role
        FROM user
      ORDER BY surname DESC
    `;

  // Initialisation des variables d'erreur et de résultat
  let error = null;
  let result = null;

  try {
    // Exécution de la requête SQL pour récupérer les informations de tous les utilisateurs
    result = await query(sql);
  } catch (e) {
    // Capture de l'erreur en cas d'échec de l'exécution de la requête
    error = e.message;
  } finally {
    // Retour d'un objet contenant l'erreur (le cas échéant) et le résultat de la requête
    return { error, result };
  }
};

// Requête pour sélectionner les informations personnelles du compte de l'utilisateur à afficher lorsqu'il est connecté
const readOneUser = async (id) => {
  const sql = `
      SELECT surname, email, role
        FROM user
        WHERE id_user = ?
    `;

  let error = null;
  let result = null;

  try {
    // Exécution de la requête SQL pour récupérer les informations d'un utilisateur
    result = await query(sql, [id]);
  } catch (e) {
    // Capture de l'erreur en cas d'échec de l'exécution de la requête
    error = e.message;
  } finally {
    // Retour d'un objet contenant l'erreur (le cas échéant) et le résultat de la requête
    return { error, result };
  }
};

// Requête pour récupérer les informations d'authentification d'un utilisateur lors de la connexion
const signIn = async (email) => {
  const sql = `
  SELECT id_user, email, password, surname, role
  FROM user
  WHERE email = ?`;

  let error = null;
  let result = null;

  try {
    // Exécution de la requête SQL pour récupérer les informations d'authentification
    result = await query(sql, [email]);
  } catch (e) {
    // Capture de l'erreur en cas d'échec de l'exécution de la requête
    error = e.message;
  } finally {
    // Retour d'un objet contenant l'erreur (le cas échéant) et le résultat de la requête
    return { error, result };
  }
};

const updateUser = async (surname, email, hashedPassword, role, userId) => {
  const sql = `
  UPDATE user SET surname=?, email=?, password=?, role=? 
  WHERE id_user=?`;

  let error = null;
  let result = null;

  try {
    // Exécution de la requête SQL pour créer un nouvel utilisateur
    result = await query(sql, [surname, email, hashedPassword, role, userId]);
  } catch (e) {
    // Capture de l'erreur en cas d'échec de l'exécution de la requête
    error = e.message;
  } finally {
    // Retour d'un objet contenant l'erreur (le cas échéant) et le résultat de la requête
    return { error, result };
  }
};

// Exportation des fonctions dans user.controller
export const UserDB = {
  emailExist,
  signUp,
  read,
  readOneUser,
  signIn,
  updateUser,
};