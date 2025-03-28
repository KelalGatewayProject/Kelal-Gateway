const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Middleware to verify JWT token
const auth = async (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "No token, authorization denied" });
    }

    const token = authHeader.replace("Bearer ", "");

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user by id
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    // Add user to request object
    req.user = user;
    req.userId = user._id;
    next();
  } catch (error) {
    console.error("Auth middleware error:", error.message);
    res.status(401).json({ error: "Token is not valid" });
  }
};

// Middleware to check if user is an organizer
const isOrganizer = (req, res, next) => {
  if (
    req.user &&
    (req.user.role === "organizer" || req.user.role === "admin")
  ) {
    next();
  } else {
    res.status(403).json({ error: "Access denied. Organizer role required." });
  }
};

// Middleware to check if user is an admin
const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ error: "Access denied. Admin role required." });
  }
};

module.exports = { auth, isOrganizer, isAdmin };
