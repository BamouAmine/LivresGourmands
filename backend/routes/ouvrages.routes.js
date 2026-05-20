const express = require("express");
const router = express.Router();

const ouvrageController = require("../controllers/ouvrage.controller");
const { verifyToken } = require("../middleware/auth");
const { checkRole } = require("../middleware/role");

/**
 * PUBLIC
 */
router.get("/", ouvrageController.getAllOuvrages);
router.get("/:id", ouvrageController.getOuvrageById);

/**
 * PROTÉGÉ (gestionnaire ou editeur)
 */
router.post(
  "/",
  verifyToken,
  checkRole("gestionnaire", "editeur"),
  ouvrageController.createOuvrage
);

router.put(
  "/:id",
  verifyToken,
  checkRole("gestionnaire", "editeur"),
  ouvrageController.updateOuvrage
);

router.delete(
  "/:id",
  verifyToken,
  checkRole("gestionnaire"),
  ouvrageController.deleteOuvrage
);

module.exports = router;