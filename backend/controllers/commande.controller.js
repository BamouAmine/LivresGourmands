const db = require('../config/db');

exports.createCommande = (req, res) => {
  db.beginTransaction(err => {
    if (err) throw err;
    db.query("INSERT INTO commandes (client_id,date,total,statut) VALUES (?,NOW(),0,'en_cours')", [req.user.id], (err, result) => {
      if (err) return db.rollback(() => res.status(500).json(err));
      const commandeId = result.insertId;
      db.query("SELECT * FROM panier_items WHERE panier_id=(SELECT id FROM panier WHERE client_id=? AND actif=1)", [req.user.id], (err, items) => {
        if (err) return db.rollback(() => res.status(500).json(err));

        let total = 0;
        items.forEach(i => total += i.prix_unitaire * i.quantite);

        const commandeItems = items.map(i => [commandeId, i.ouvrage_id, i.quantite, i.prix_unitaire]);
        const sql = "INSERT INTO commande_items (commande_id,ouvrage_id,quantite,prix_unitaire) VALUES ?";
        db.query(sql, [commandeItems], (err) => {
          if (err) return db.rollback(() => res.status(500).json(err));
          db.query("UPDATE commandes SET total=? WHERE id=?", [total, commandeId], (err) => {
            if (err) return db.rollback(() => res.status(500).json(err));
            db.query("UPDATE ouvrages o JOIN panier_items p ON o.id=p.ouvrage_id SET o.stock=o.stock-p.quantite WHERE p.panier_id=(SELECT id FROM panier WHERE client_id=? AND actif=1)", [req.user.id], (err) => {
              if (err) return db.rollback(() => res.status(500).json(err));
              db.query("UPDATE panier SET actif=0 WHERE client_id=?", [req.user.id], (err) => {
                if (err) return db.rollback(() => res.status(500).json(err));
                db.commit(err => {
                  if (err) return db.rollback(() => res.status(500).json(err));
                  res.json({ message: "Commande créée", commandeId });
                });
              });
            });
          });
        });
      });
    });
  });
};

exports.getHistorique = (req, res) => {
  db.query(
    "SELECT c.id, c.date, c.total, c.statut, u.nom, u.email FROM commandes c JOIN users u ON c.client_id = u.id WHERE c.client_id = ? ORDER BY c.date DESC",
    [req.user.id],
    (err, results) => {
      if (err) return res.status(500).json({ message: err.message });
      res.json(results);
    }
  );
};

exports.getCommande = (req, res) => {
  const { id } = req.params;
  db.query(
    "SELECT c.id, c.date, c.total, c.statut, u.nom, u.email FROM commandes c JOIN users u ON c.client_id = u.id WHERE c.id = ?",
    [id],
    (err, results) => {
      if (err) return res.status(500).json({ message: err.message });
      if (results.length === 0) return res.status(404).json({ message: 'Commande introuvable' });
      res.json(results[0]);
    }
  );
};

exports.updateStatus = (req, res) => {
  const { id } = req.params;
  const { statut } = req.body;
  db.query(
    "UPDATE commandes SET statut = ? WHERE id = ?",
    [statut, id],
    (err) => {
      if (err) return res.status(500).json({ message: err.message });
      res.json({ message: 'Statut de commande mis à jour' });
    }
  );
};