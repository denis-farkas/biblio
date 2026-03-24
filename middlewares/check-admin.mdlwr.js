import { UserDB } from "../database/db.provider.js";
// Middleware pour vérifier le statut d'administrateur de l'utilisateur
const checkAdmin = async (req, res, next) => {
  const userId = req.body.userId || req.body.id_user;
  if (!userId) {
    return res.status(401).json({ message: "Utilisateur non authentifié" });
  }

  const oneUser = await UserDB.readOneUser(userId);
  const role = oneUser?.result?.[0]?.role || null;

  if (!role) {
    return res.status(404).json({ message: "Utilisateur introuvable" });
  }

  // Vérification si l'utilisateur a le rôle d'administrateur
  if (role !== "admin") {
    return res
      .status(403)
      .json({ message: "Vous n'avez pas les droits d'administrateur" });
  }
  // Poursuite de l'exécution de la requête suivante (middleware suivant)
  next();
};
export default checkAdmin;
