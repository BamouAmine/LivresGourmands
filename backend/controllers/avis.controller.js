const db = require('../config/db');

exports.addAvis = (req, res) => {
  const { ouvrage_id, note, commentaire } = req.body;
  if (!ouvrage_id || !note || !commentaire) {
    return res.status(400).json({ message: 'ouvrage_id, note et commentaire sont requis.' });
  }

  db.query(
    'INSERT INTO avis (ouvrage_id, utilisateur_id, note, commentaire, date_avis) VALUES (?, ?, ?, ?, NOW())',
    [ouvrage_id, req.user.id, note, commentaire],
    (err, result) => {
      if (err) return res.status(500).json({ message: err.message });
      res.json({ message: 'Avis ajouté', avisId: result.insertId });
    }
  );
};
