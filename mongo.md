# Fiche TP - Installation MongoDB + Compass (Windows)

## Objectif

A la fin du TP, l'eleve doit savoir :

- installer MongoDB Community Server sur Windows,
- verifier que le service MongoDB tourne,
- utiliser MongoDB Compass,
- creer une base de donnees,
- creer des collections,
- inserer un premier document,
- connecter le projet Node.js a MongoDB.

## Prerequis

- Windows 10/11
- Droits d'installation sur le PC
- VS Code installe
- Projet present localement

## Duree

45 a 60 minutes

## Partie A - Installer MongoDB Community Server

1. Aller sur le site officiel MongoDB (section Downloads).
2. Telecharger MongoDB Community Server (fichier MSI pour Windows).
3. Lancer l'installateur.
4. Choisir l'installation complete.
5. Laisser active l'option d'installation comme service Windows.
6. Terminer l'installation.

### Verification du service (PowerShell)

Executer :

```powershell
Get-Service MongoDB
```

Resultat attendu :

- Le service `MongoDB` existe.
- Son statut est `Running` (ou `Stopped`).

Si le service est stoppe :

```powershell
Start-Service MongoDB
```

Verifier a nouveau :

```powershell
Get-Service MongoDB
```

## Partie B - Installer MongoDB Compass

1. Telecharger MongoDB Compass depuis le site officiel.
2. Installer Compass.
3. Ouvrir Compass.

## Partie C - Connexion locale avec Compass

1. Dans Compass, utiliser la connection string :

```text
mongodb://127.0.0.1:27017
```

2. Cliquer sur `Connect`.

Resultat attendu :

- La connexion est etablie.
- Le panneau des bases apparait.

## Partie D - Creer la base et les collections

1. Cliquer sur `Create Database`.
2. Renseigner :

- Database Name: `bibliotheque_mongo`
- Collection Name: `books`

3. Valider.
4. Ajouter deux collections supplementaires :

- `genre`
- `user`

Resultat attendu :

- La base `bibliotheque_mongo` contient 3 collections : `books`, `genre`, `user`.

## Partie E - Inserer des donnees de test

### 1) Collection `genre`

Inserer au moins 2 documents :

```json
{ "genre_name": "Aventure" }
```

```json
{ "genre_name": "Science-fiction" }
```

### 2) Collection `books`

Inserer 1 document :

```json
{
  "title": "Le Tour du monde en 80 jours",
  "autor": "Jules Verne",
  "resume": "blabla",
  "published_at": 1873,
  "cover": "monde.jpg",
  "genre": "Aventure",
  "verified": 0
}
```

### 3) Collection `user`

Inserer 1 document :

```json
{
  "surname": "Eleve Test",
  "email": "eleve@test.com",
  "password": "motdepasse_hache_ou_test",
  "role": "user"
}
```

## Partie F - Relier le projet Node.js a MongoDB

Dans le fichier `.env` du projet, verifier :

```env
USE_MONGO=true
MONGO_URI=mongodb://127.0.0.1:27017
MONGO_DB_NAME=bibliotheque_mongo
```

Puis lancer le projet :

```bash
npm run dev
```

Resultat attendu :

- Le serveur demarre.
- Les routes lisent/ecrivent dans MongoDB.

## Partie G - Verification fonctionnelle minimale

Faire les tests suivants :

1. Lire la liste des livres depuis le front.
2. Ajouter un livre.
3. Ouvrir la fiche du livre ajoute.

Resultat attendu :

- Les donnees sont visibles dans le front.
- Les donnees apparaissent aussi dans Compass.