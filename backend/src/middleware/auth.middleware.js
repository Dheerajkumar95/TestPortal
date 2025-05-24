// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");
const User = require("../models/user.model.js");

const protect = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    console.log("Token from cookie:", token);

    if (!token) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded:", decoded);

    req.user = await User.findById(decoded.userId).select("-password");
    console.log("req.user:", req.user);

    if (!req.user) {
      return res
        .status(401)
        .json({ message: "Not authorized, user not found" });
    }

    next();
  } catch (err) {
    console.error("JWT error:", err);
    res.status(401).json({ message: "Not authorized" });
  }
};

module.exports = protect;
