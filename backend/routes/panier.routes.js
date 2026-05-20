const router = require("express").Router();
const panierController = require("../controllers/panier.controller");
const { verifyToken } = require("../middleware/auth");

router.get("/", verifyToken, panierController.getPanier);
router.post("/items", verifyToken, panierController.addItem);

module.exports = router;