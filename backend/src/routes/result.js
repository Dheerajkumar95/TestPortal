const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/auth.middleware");
const {
  saveResult,
  saveSectionScore,
  getUserSectionScores,
} = require("../controllers/resultController.js");

router.post("/save", requireAuth, saveResult);
router.post("/savesection", requireAuth, saveSectionScore);
router.get("/getsectionscores", requireAuth, getUserSectionScores);
module.exports = router;
