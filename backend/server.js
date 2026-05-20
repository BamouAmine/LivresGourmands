require("dotenv").config();

const app = require("./app");

const PORT = process.env.PORT || 3000;

// gestion erreurs globales
process.on("uncaughtException", (err) => {
  console.error("Erreur non capturée :", err);
  process.exit(1);
});

process.on("unhandledRejection", (err) => {
  console.error(" Promesse rejetée :", err);
  process.exit(1);
});

// lancer serveur
app.listen(PORT, () => {
  console.log(` Serveur lancé sur http://localhost:${PORT}`);
});