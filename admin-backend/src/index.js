const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { connectDB } = require("./lib/db.js");

const authRoutes = require("./routes/auth.route.js");
const questionsRoutes = require("./routes/questions");
const adminRoutes = require("./routes/admin");
dotenv.config();
const app = express();
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
app.use("/uploads", express.static("uploads"));

// ✅ Correct routes
app.use("/api/auth", authRoutes);
app.use("/api/questions", questionsRoutes);
app.use("/api/admin-users", adminRoutes);
app.listen(PORT, () => {
  console.log("server is running on PORT:" + PORT);
  connectDB();
});
