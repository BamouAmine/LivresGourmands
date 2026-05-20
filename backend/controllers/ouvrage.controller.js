const db = require("../config/db");

/**
 * GET /api/ouvrages
 * → récupérer tous les livres avec stock > 0
 */
exports.getAllOuvrages = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM ouvrages WHERE stock > 0"
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * GET /api/ouvrages/:id
 * → récupérer un livre par son identifiant
 */
exports.getOuvrageById = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await db.query(
      "SELECT * FROM ouvrages WHERE id = ? AND stock > 0",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Ouvrage introuvable" });
    }

    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * POST /api/ouvrages
 * → ajouter un livre
 */
exports.createOuvrage = async (req, res) => {
  try {
    const { titre, auteur, prix, stock, categorie_id } = req.body;

    await db.query(
      "INSERT INTO ouvrages (titre, auteur, prix, stock, categorie_id) VALUES (?, ?, ?, ?, ?)",
      [titre, auteur, prix, stock, categorie_id]
    );

    res.json({ message: "Ouvrage ajouté" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * PUT /api/ouvrages/:id
 * → modifier un livre
 */
exports.updateOuvrage = async (req, res) => {
  try {
    const { id } = req.params;
    const { titre, prix } = req.body;

    await db.query(
      "UPDATE ouvrages SET titre=?, prix=? WHERE id=?",
      [titre, prix, id]
    );

    res.json({ message: "Ouvrage modifié" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * DELETE /api/ouvrages/:id
 */
exports.deleteOuvrage = async (req, res) => {
  try {
    const { id } = req.params;

    await db.query("DELETE FROM ouvrages WHERE id=?", [id]);

    res.json({ message: "Ouvrage supprimé" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};