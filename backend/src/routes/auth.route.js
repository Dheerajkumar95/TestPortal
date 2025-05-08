const express = require("express");
const {
  createpasskey,
  checkAuth,
  login,
  signup,
} = require("../controllers/auth.controller.js");
const { protectRoute } = require("../middleware/auth.middleware.js");

const router = express.Router();
router.post("/createpasskey", createpasskey);
router.post("/signup", signup);
router.post("/login", login);
router.get("/check", protectRoute, checkAuth);
module.exports = router;
