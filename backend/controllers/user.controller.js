const db = require('../config/db');

exports.getMe = (req, res) => {
  const userId = req.user.id;
  db.query("SELECT id, nom, email, role, actif FROM users WHERE id = ?", [userId], (err, results) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json(results[0]);
  });
};

exports.getAllUsers = (req, res) => {
  db.query("SELECT id, nom, email, role, actif FROM users", (err, results) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json(results);
  });
};

exports.updateUser = (req, res) => {
  const { id } = req.params;
  const { nom, email, role, actif } = req.body;
  db.query("UPDATE users SET nom=?, email=?, role=?, actif=? WHERE id=?", [nom, email, role, actif, id],
    (err) => {
      if (err) return res.status(500).json({ message: err.message });
      res.json({ message: "Utilisateur mis à jour " });
    });
};