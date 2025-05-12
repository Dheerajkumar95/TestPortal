const express = require("express");
const {
  createpasskey,
  passkey,
  checkAuth,
  login,
  verifyOtpAndRegister,
  sendotp,
  resendotp,
} = require("../controllers/auth.controller.js");
const { protectRoute } = require("../middleware/auth.middleware.js");

const router = express.Router();
router.post("/createpasskey", createpasskey);
router.post("/passkey", passkey);
router.post("/sendotp", sendotp);
router.post("/resendotp", resendotp);
router.post("/verifyOtpAndRegister", verifyOtpAndRegister);
router.post("/login", login);
router.get("/check", protectRoute, checkAuth);
module.exports = router;
