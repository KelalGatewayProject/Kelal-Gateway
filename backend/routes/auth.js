const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const validation = require("../utils/validation");
const emailService = require("../utils/emailService");
const twilioService = require("../utils/twilioService");
const authMiddleware = require("../middleware/auth");

// Register a new user
router.post(
  "/register",
  [
    body("name").trim().notEmpty().withMessage("Name is required"),
    body("email")
      .isEmail()
      .withMessage("Please provide a valid email")
      .normalizeEmail(),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long")
      .matches(/\d/)
      .withMessage("Password must contain a number")
      .matches(/[A-Z]/)
      .withMessage("Password must contain an uppercase letter"),
    body("phone")
      .optional()
      .custom((value) => {
        if (value && !validation.isValidPhone(value)) {
          throw new Error("Please provide a valid phone number");
        }
        return true;
      }),
  ],
  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name, email, password, phone } = req.body;

      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res
          .status(400)
          .json({ message: "User with this email already exists" });
      }

      // Check if phone is already in use
      if (phone) {
        const existingPhoneUser = await User.findOne({ phone });
        if (existingPhoneUser) {
          return res
            .status(400)
            .json({ message: "Phone number is already in use" });
        }
      }

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Generate verification token
      const verificationToken = jwt.sign(
        { email },
        process.env.JWT_SECRET || "your-secret-key",
        { expiresIn: "24h" },
      );

      // Create new user
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
        verificationToken,
        phone: phone || undefined,
      });

      await newUser.save();

      // Send verification email
      const verificationUrl = `${process.env.FRONTEND_URL}/verify-email/${verificationToken}`;
      await emailService.sendVerificationEmail(email, name, verificationUrl);

      // Create JWT token
      const token = jwt.sign(
        { userId: newUser._id },
        process.env.JWT_SECRET || "your-secret-key",
        { expiresIn: "7d" },
      );

      res.status(201).json({
        message: "User registered successfully. Please verify your email.",
        token,
        user: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          phone: newUser.phone,
          role: newUser.role,
          isVerified: newUser.isVerified,
          isPhoneVerified: newUser.isPhoneVerified,
        },
      });
    } catch (error) {
      console.error("Registration error:", error);
      res.status(500).json({ message: "Server error during registration" });
    }
  },
);

// Phone login - Step 1: Send OTP
router.post(
  "/phone-login/send-otp",
  [
    body("phone")
      .notEmpty()
      .withMessage("Phone number is required")
      .custom((value) => {
        if (!validation.isValidPhone(value)) {
          throw new Error("Please provide a valid phone number");
        }
        return true;
      }),
  ],
  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { phone } = req.body;

      // Find user by phone
      const user = await User.findOne({ phone });
      if (!user) {
        return res
          .status(400)
          .json({ message: "No account found with this phone number" });
      }

      // Generate OTP
      const otpCode = twilioService.generateOTP();
      const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

      // Save OTP to user
      user.phoneVerificationCode = {
        code: otpCode,
        expiresAt: otpExpiry,
      };
      await user.save();

      // Send OTP via Twilio
      await twilioService.sendOTP(phone, otpCode);

      res.json({
        message: "OTP sent successfully",
        expiresAt: otpExpiry,
      });
    } catch (error) {
      console.error("Phone login OTP error:", error);
      res.status(500).json({ message: "Server error sending OTP" });
    }
  },
);

// Phone login - Step 2: Verify OTP
router.post(
  "/phone-login/verify-otp",
  [
    body("phone")
      .notEmpty()
      .withMessage("Phone number is required")
      .custom((value) => {
        if (!validation.isValidPhone(value)) {
          throw new Error("Please provide a valid phone number");
        }
        return true;
      }),
    body("otp").notEmpty().withMessage("OTP is required"),
  ],
  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { phone, otp } = req.body;

      // Find user by phone
      const user = await User.findOne({ phone });
      if (!user) {
        return res
          .status(400)
          .json({ message: "No account found with this phone number" });
      }

      // Check if OTP exists and is valid
      if (
        !user.phoneVerificationCode ||
        !user.phoneVerificationCode.code ||
        !user.phoneVerificationCode.expiresAt
      ) {
        return res
          .status(400)
          .json({ message: "No OTP found. Please request a new one" });
      }

      // Check if OTP is expired
      if (new Date() > new Date(user.phoneVerificationCode.expiresAt)) {
        return res
          .status(400)
          .json({ message: "OTP has expired. Please request a new one" });
      }

      // Verify OTP
      if (user.phoneVerificationCode.code !== otp) {
        return res.status(400).json({ message: "Invalid OTP" });
      }

      // Mark phone as verified
      user.isPhoneVerified = true;
      user.phoneVerificationCode = undefined;
      await user.save();

      // Create JWT token
      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET || "your-secret-key",
        { expiresIn: "7d" },
      );

      res.json({
        message: "Phone verified successfully",
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role,
          isVerified: user.isVerified,
          isPhoneVerified: user.isPhoneVerified,
        },
      });
    } catch (error) {
      console.error("Phone login verification error:", error);
      res.status(500).json({ message: "Server error verifying OTP" });
    }
  },
);

// Add phone number to account
router.post(
  "/add-phone",
  [
    body("phone")
      .notEmpty()
      .withMessage("Phone number is required")
      .custom((value) => {
        if (!validation.isValidPhone(value)) {
          throw new Error("Please provide a valid phone number");
        }
        return true;
      }),
  ],
  authMiddleware,
  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { phone } = req.body;

      // Check if phone is already in use
      const existingPhoneUser = await User.findOne({ phone });
      if (
        existingPhoneUser &&
        existingPhoneUser._id.toString() !== req.user.userId
      ) {
        return res
          .status(400)
          .json({ message: "Phone number is already in use" });
      }

      // Find user
      const user = await User.findById(req.user.userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Generate OTP
      const otpCode = twilioService.generateOTP();
      const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

      // Save phone and OTP to user
      user.phone = phone;
      user.phoneVerificationCode = {
        code: otpCode,
        expiresAt: otpExpiry,
      };
      await user.save();

      // Send OTP via Twilio
      await twilioService.sendOTP(phone, otpCode);

      res.json({
        message: "OTP sent successfully",
        expiresAt: otpExpiry,
      });
    } catch (error) {
      console.error("Add phone error:", error);
      res.status(500).json({ message: "Server error adding phone" });
    }
  },
);

// Verify phone OTP
router.post(
  "/verify-phone",
  [body("otp").notEmpty().withMessage("OTP is required")],
  authMiddleware,
  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { otp } = req.body;

      // Find user
      const user = await User.findById(req.user.userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Check if OTP exists and is valid
      if (
        !user.phoneVerificationCode ||
        !user.phoneVerificationCode.code ||
        !user.phoneVerificationCode.expiresAt
      ) {
        return res
          .status(400)
          .json({ message: "No OTP found. Please request a new one" });
      }

      // Check if OTP is expired
      if (new Date() > new Date(user.phoneVerificationCode.expiresAt)) {
        return res
          .status(400)
          .json({ message: "OTP has expired. Please request a new one" });
      }

      // Verify OTP
      if (user.phoneVerificationCode.code !== otp) {
        return res.status(400).json({ message: "Invalid OTP" });
      }

      // Mark phone as verified
      user.isPhoneVerified = true;
      user.phoneVerificationCode = undefined;
      await user.save();

      res.json({
        message: "Phone verified successfully",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role,
          isVerified: user.isVerified,
          isPhoneVerified: user.isPhoneVerified,
        },
      });
    } catch (error) {
      console.error("Verify phone error:", error);
      res.status(500).json({ message: "Server error verifying phone" });
    }
  },
);

// Resend phone OTP
router.post("/resend-phone-otp", authMiddleware, async (req, res) => {
  try {
    // Find user
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.phone) {
      return res
        .status(400)
        .json({ message: "No phone number associated with this account" });
    }

    // Generate OTP
    const otpCode = twilioService.generateOTP();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Save OTP to user
    user.phoneVerificationCode = {
      code: otpCode,
      expiresAt: otpExpiry,
    };
    await user.save();

    // Send OTP via Twilio
    await twilioService.sendOTP(user.phone, otpCode);

    res.json({
      message: "OTP sent successfully",
      expiresAt: otpExpiry,
    });
  } catch (error) {
    console.error("Resend phone OTP error:", error);
    res.status(500).json({ message: "Server error sending OTP" });
  }
});

// Login user
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Please provide a valid email"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { email, password } = req.body;

      // Find user by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      // Check password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      // Create JWT token
      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET || "your-secret-key",
        { expiresIn: "7d" },
      );

      res.json({
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role,
          isVerified: user.isVerified,
          isPhoneVerified: user.isPhoneVerified,
        },
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: "Server error during login" });
    }
  },
);

// Other existing routes...

module.exports = router;
