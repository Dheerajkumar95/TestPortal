const express = require("express");
const {
  createpasskey,
  passkey,
  checkAuth,
  login,
  verifyOtpAndRegister,
  sendotp,
  resendotp,
  questions,
  forgotPassword,
  verifyToken,
  resetPassword,
} = require("../controllers/auth.controller.js");
const { protectRoute } = require("../middleware/auth.middleware.js");
const User = require("../models/user.model.js");
const router = express.Router();
router.post("/createpasskey", createpasskey);
router.post("/passkey", passkey);
router.post("/sendotp", sendotp);
router.post("/resendotp", resendotp);
router.post("/verifyOtpAndRegister", verifyOtpAndRegister);
router.post("/login", login);
router.get("/questions", questions);
router.get("/check", protectRoute, checkAuth);
router.post("/forgotPassword", forgotPassword);
router.get("/verify-token/:token", verifyToken);
router.post("/reset-password/:token", resetPassword);
module.exports = router;
