const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/auth.middleware");
const { saveResult } = require("../controllers/resultController.js");

router.post("/save", requireAuth, saveResult);

module.exports = router;
