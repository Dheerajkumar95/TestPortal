const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/auth.middleware");
const { saveResult, saveScore } = require("../controllers/resultController.js");

router.post("/save", requireAuth, saveResult);
router.post("/savesection", requireAuth, saveScore);
module.exports = router;
