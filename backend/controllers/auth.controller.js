const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { nom, email, password } = req.body;

    const hash = await bcrypt.hash(password, 10);

    const [result] = await db.query(
      "INSERT INTO users (nom, email, password_hash, role) VALUES (?, ?, ?, ?)",
      [nom, email, hash, 'client']
    );

    const token = jwt.sign(
      { id: result.insertId, role: 'client', nom },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ message: 'Utilisateur créé', token });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ message: 'Email déjà utilisé' });
    }
    res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const [users] = await db.query(
      "SELECT * FROM users WHERE email=?",
      [email]
    );

    if (users.length === 0)
      return res.status(404).json({ message: "User not found" });

    const user = users[0];

    const valid = await bcrypt.compare(password, user.password_hash);

    if (!valid)
      return res.status(401).json({ message: "Wrong password" });

    res.json({ token: jwt.sign(
        { id: user.id, role: user.role, nom: user.nom },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      ) });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};