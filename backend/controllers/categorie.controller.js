const db = require('../config/db');

exports.getAll = (req, res) => {
    db.query("SELECT * FROM categories", (err, result) => res.json(result));
};

exports.create = (req, res) => {
    const { nom, description } = req.body;
    db.query("INSERT INTO categories (nom,description) VALUES (?,?)", [nom, description], (err) => {
        res.json({ message: "Catégorie créée" });
    });
};

exports.update = (req, res) => {
    const { nom, description } = req.body;
    db.query("UPDATE categories SET nom=?, description=? WHERE id=?", [nom, description, req.params.id], () => {
        res.json({ message: "Catégorie mise à jour" });
    });
};

exports.delete = (req, res) => {
    db.query("DELETE FROM categories WHERE id=?", [req.params.id], () => {
        res.json({ message: "Catégorie supprimée" });
    });
};