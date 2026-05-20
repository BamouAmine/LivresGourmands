const express = require('express');
const router = express.Router();
const { getMe, getAllUsers, updateUser } = require('../controllers/user.controller');
const { verifyToken } = require('../middleware/auth');
const { checkRole } = require('../middleware/role');

router.get('/me', verifyToken, getMe);
router.get('/', verifyToken, checkRole('administrateur'), getAllUsers);
router.put('/:id', verifyToken, updateUser);

module.exports = router;