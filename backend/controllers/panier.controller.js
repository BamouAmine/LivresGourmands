const db = require("../config/db");

exports.getPanier = async (req, res) => {
  const [rows] = await db.query(
    "SELECT * FROM panier_items WHERE panier_id = ?",
    [1]
  );

  res.json(rows);
};

exports.addItem = async (req, res) => {
  const { ouvrage_id, quantite } = req.body;

  await db.query(
    "INSERT INTO panier_items (panier_id, ouvrage_id, quantite) VALUES (?, ?, ?)",
    [1, ouvrage_id, quantite]
  );

  res.json({ message: "Ajouté" });
};