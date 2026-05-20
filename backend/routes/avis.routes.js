const router = require("express").Router();
const ctrl = require("../controllers/avis.controller");
const { verifyToken } = require("../middleware/auth");

router.post("/", verifyToken, ctrl.addAvis);

module.exports = router;