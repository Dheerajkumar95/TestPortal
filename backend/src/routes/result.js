const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/auth.middleware");
const {
  saveResult,
  saveScore,
  getUserSectionScores,
} = require("../controllers/resultController.js");

router.post("/save", requireAuth, saveResult);
router.post("/savesection", requireAuth, saveScore);
router.get("/getsectionscores", requireAuth, getUserSectionScores);
module.exports = router;
