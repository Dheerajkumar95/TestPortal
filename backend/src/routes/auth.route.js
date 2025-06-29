const express = require("express");
const authenticate = require("../middleware/auth.middleware");
const {
  passkey,
  login,
  checkAuth,
  verifyOtpAndRegister,
  sendotp,
  resendotp,
  questions,
  forgotPassword,
  verifyToken,
  resetPassword,
  profile,
  updateProfile,
  logout,
} = require("../controllers/auth.controller.js");
const router = express.Router();
router.post("/passkey", authenticate, passkey);
router.post("/sendotp", sendotp);
router.post("/resendotp", resendotp);
router.post("/verifyOtpAndRegister", verifyOtpAndRegister);
router.post("/login", login);
router.put("/update-profile", authenticate, updateProfile);
router.get("/profile", authenticate, profile);
router.get("/check", authenticate, checkAuth);
router.get("/questions", authenticate, questions);
router.post("/forgotPassword", forgotPassword);
router.get("/verify-token/:token", verifyToken);
router.post("/reset-password/:token", resetPassword);
router.post("/logout", authenticate, logout);
module.exports = router;
