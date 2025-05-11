const bcrypt = require("bcryptjs");
const { generateToken } = require("../lib/utils.js");
const User = require("../models/user.model.js");
const NPasskey = require("../models/passkey.model.js");
const Otp = require("../models/otp.model.js");
const nodemailer = require("nodemailer");
const {
  sendVerificationEamil,
  senWelcomeEmail,
} = require("../middleware/Email.js");
const createpasskey = async (req, res) => {
  const { Passkey } = req.body;
  try {
    if (!Passkey) {
      return res.status(400).json({ message: "Passkey is required" });
    }
    const allPasskeys = await NPasskey.find();
    for (const item of allPasskeys) {
      const isMatch = await bcrypt.compare(Passkey, item.Passkey);
      if (isMatch) {
        return res.status(400).json({ message: "Passkey already exists" });
      }
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPasskey = await bcrypt.hash(Passkey, salt);

    const newPasskey = new NPasskey({
      Passkey: hashedPasskey,
    });

    if (newPasskey) {
      generateToken(newPasskey._id, res);
      await newPasskey.save();

      res.status(201).json({
        _id: newPasskey._id,
        Passkey: newPasskey.Passkey,
        createdAt: newPasskey.createdAt,
      });
    } else {
      res.status(400).json({ message: "Invalid Passkey data" });
    }
  } catch (error) {
    console.log("Error in Passkey controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
const sendotp = async (req, res) => {
  const { email, password, confirmPassword, fullName } = req.body;
  console.log("Email received:", email);

  // 1. Check if already registered
  const uexists = await User.findOne({ email });
  if (uexists) return res.status(400).json({ message: "User already exists" });
  const exists = await Otp.findOne({ email });
  if (exists) return res.status(400).json({ message: "User already exists" });
  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }
  // 2. Generate OTP
  const otp = Math.floor(100000 + Math.random() * 900000);

  // 3. Save OTP in temp DB or in-memory storage
  await Otp.create({
    email,
    otp,
    expiresAt: Date.now() + 300000,
  });

  // 4. Send OTP (e.g. via email/SMS)
  await sendVerificationEamil(email, otp, fullName);
  console.log("Email received:", email);
  return res.status(200).json({ message: "OTP sent successfully" });
};

const verifyOtpAndRegister = async (req, res) => {
  const { otp, user } = req.body;
  const { fullName, email, contact, password, confirmPassword } = user;
  console.log("Received body:", req.body);
  try {
    // 1. Check if passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // 2. Find the OTP record
    const otpRecord = await Otp.findOne({ email });
    if (!otpRecord) return res.status(400).json({ message: "OTP not found" });

    // 3. Check if OTP expired
    if (otpRecord.expiresAt < Date.now()) {
      await Otp.deleteOne({ email });
      return res.status(400).json({ message: "OTP expired" });
    }

    // 4. Check if OTP matches
    if (otpRecord.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // 5. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const hashedConfirmPassword = await bcrypt.hash(confirmPassword, 10);
    // 6. Create user
    const newUser = await User.create({
      fullName,
      email,
      contact,
      password: hashedPassword,
      confirmPassword: hashedConfirmPassword,
    });
    await senWelcomeEmail(email, fullName);
    // 7. Clean up used OTP
    await Otp.deleteOne({ email });

    // 8. Return success response
    res.status(201).json({
      _id: newUser._id,
      fullName: newUser.fullName,
      email: newUser.email,
    });
  } catch (error) {
    console.error("OTP verification error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
const resendotp = async (req, res) => {
  try {
    const { email, fullName } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);
    await Otp.findOneAndUpdate(
      { email },
      { otp, createdAt: new Date() },
      { upsert: true, new: true }
    );

    await sendVerificationEamil(email, otp, fullName);

    res.status(200).json({ message: "OTP sent successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to send OTP" });
  }
};

const signup = async (req, res) => {
  const { fullName, email, contact, password, confirmPassword } = req.body;
  try {
    if (!fullName || !email || !contact || !password || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    const user = await User.findOne({ email });

    if (user) return res.status(400).json({ message: "Email already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      email,
      contact,
      password: hashedPassword,
      confirmPassword: hashedPassword,
    });

    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        contact: newUser.contact,
        profilePic: newUser.profilePic,
        createdAt: newUser.createdAt,
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid Username" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid Password" });
    }

    generateToken(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { profilePic } = req.body;
    const userId = req.user._id;

    if (!profilePic) {
      return res.status(400).json({ message: "Profile pic is required" });
    }

    const uploadResponse = await cloudinary.uploader.upload(profilePic);
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: uploadResponse.secure_url },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    console.log("error in update profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const checkAuth = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("Error in checkAuth controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  signup,
  login,
  logout,
  updateProfile,
  checkAuth,
  createpasskey,
  sendotp,
  resendotp,
  verifyOtpAndRegister,
};
