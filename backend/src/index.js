const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
const { connectDB } = require("./lib/db.js");
const authRoutes = require("./routes/auth.route.js");

dotenv.config();
const PORT = process.env.PORT || 7007;
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.listen(PORT, () => {
  console.log("server is running on PORT:" + PORT);
  connectDB();
});
