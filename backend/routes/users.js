const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { auth } = require("../middleware/auth");
const validation = require("../utils/validation");

// @route   GET /api/users/profile
// @desc    Get current user profile
// @access  Private
router.get("/profile", auth, async (req, res) => {
  try {
    // User is already attached to req by auth middleware
    const user = req.user;

    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      city: user.city,
      birthDate: user.birthDate,
      language: user.language,
      avatar: user.avatar,
    });
  } catch (error) {
    console.error("Get profile error:", error.message);
    res.status(500).json({ error: "Server error" });
  }
});

// @route   PUT /api/users/profile
// @desc    Update user profile
// @access  Private
router.put("/profile", auth, async (req, res) => {
  try {
    const { name, phone, city, birthDate, language, avatar } = req.body;

    // Validate inputs
    if (phone && !validation.isValidPhone(phone)) {
      return res.status(400).json({ error: "Invalid phone number format" });
    }

    if (avatar && !validation.isValidURL(avatar)) {
      return res.status(400).json({ error: "Invalid avatar URL" });
    }

    // Validate birthDate if provided
    if (birthDate) {
      if (!birthDate.year || !birthDate.month || !birthDate.day) {
        return res
          .status(400)
          .json({ error: "Birth date must include year, month, and day" });
      }
    }

    // Build profile object with sanitized inputs
    const profileFields = {};
    if (name) profileFields.name = validation.sanitizeString(name);
    if (phone) profileFields.phone = phone.trim();
    if (city) profileFields.city = validation.sanitizeString(city);
    if (birthDate) {
      profileFields.birthDate = {
        year: validation.sanitizeString(birthDate.year),
        month: validation.sanitizeString(birthDate.month),
        day: validation.sanitizeString(birthDate.day),
      };
    }
    if (language) profileFields.language = validation.sanitizeString(language);
    if (avatar) profileFields.avatar = avatar.trim();

    // Update user
    const updatedUser = await User.findByIdAndUpdate(
      req.userId,
      { $set: profileFields },
      { new: true },
    ).select("-password");

    res.json({
      id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      phone: updatedUser.phone,
      city: updatedUser.city,
      birthDate: updatedUser.birthDate,
      language: updatedUser.language,
      avatar: updatedUser.avatar,
    });
  } catch (error) {
    console.error("Update profile error:", error.message);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
