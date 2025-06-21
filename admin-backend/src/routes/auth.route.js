const express = require("express");
const { createpasskey } = require("../controllers/auth.controller.js");
const router = express.Router();
router.post("/passkey/create", createpasskey);
module.exports = router;
