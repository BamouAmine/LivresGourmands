const express = require('express');
const router = express.Router();
const commandesController = require('../controllers/commande.controller');
const { verifyToken } = require('../middleware/auth');
const { checkRole } = require('../middleware/role');

router.post('/', verifyToken, commandesController.createCommande);
router.get('/', verifyToken, commandesController.getHistorique);
router.get('/:id', verifyToken, commandesController.getCommande);
router.put('/:id/status', verifyToken, checkRole('administrateur', 'gestionnaire'), commandesController.updateStatus);

module.exports = router;