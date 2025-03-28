const validator = require("validator");

/**
 * Validation utility functions for sanitizing and validating user inputs
 */
const validation = {
  // String validation and sanitization
  sanitizeString: (str) => {
    if (!str) return "";
    return validator.escape(str.trim());
  },

  // Email validation
  isValidEmail: (email) => {
    if (!email) return false;
    return validator.isEmail(email);
  },

  // Password validation (min 8 chars, at least one number, one uppercase, one lowercase)
  isStrongPassword: (password) => {
    if (!password) return false;
    return validator.isStrongPassword(password, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 0,
    });
  },

  // Phone number validation
  isValidPhone: (phone) => {
    if (!phone) return true; // Phone is optional
    return validator.isMobilePhone(phone);
  },

  // Date validation
  isValidDate: (date) => {
    if (!date) return false;
    return validator.isDate(date);
  },

  // Time validation (HH:MM format)
  isValidTime: (time) => {
    if (!time) return false;
    return /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(time);
  },

  // MongoDB ObjectId validation
  isValidObjectId: (id) => {
    if (!id) return false;
    return /^[0-9a-fA-F]{24}$/.test(id);
  },

  // URL validation
  isValidURL: (url) => {
    if (!url) return true; // URL is optional
    return validator.isURL(url);
  },

  // Price validation
  isValidPrice: (price) => {
    if (price === undefined || price === null) return false;
    return validator.isFloat(price.toString(), { min: 0 });
  },

  // Capacity validation
  isValidCapacity: (capacity) => {
    if (capacity === undefined || capacity === null) return false;
    return validator.isInt(capacity.toString(), { min: 1 });
  },

  // Category validation
  isValidCategory: (category) => {
    if (!category) return false;
    const validCategories = [
      "MUSIC",
      "SPORTS",
      "ARTS",
      "FOOD",
      "BUSINESS",
      "EDUCATION",
      "SOCIAL",
      "CHARITY",
      "TECHNOLOGY",
      "OTHER",
    ];
    return validCategories.includes(category.toUpperCase());
  },

  // Status validation
  isValidEventStatus: (status) => {
    if (!status) return true; // Default status will be used if not provided
    const validStatuses = ["draft", "published", "cancelled"];
    return validStatuses.includes(status.toLowerCase());
  },

  // Role validation
  isValidUserRole: (role) => {
    if (!role) return true; // Default role will be used if not provided
    const validRoles = ["attendee", "organizer"];
    return validRoles.includes(role.toLowerCase());
  },

  // Staff position validation
  isValidStaffPosition: (position) => {
    if (!position) return false;
    const validPositions = [
      "manager",
      "security",
      "bartender",
      "host",
      "ticket scanner",
      "coordinator",
      "other",
    ];
    return validPositions.includes(position.toLowerCase());
  },

  // Permission validation
  isValidPermission: (permission) => {
    if (!permission) return false;
    const validPermissions = [
      "check-in",
      "manage-staff",
      "edit-event",
      "view-reports",
      "redeem-vouchers",
    ];
    return validPermissions.includes(permission.toLowerCase());
  },

  // Validate permissions array
  validatePermissions: (permissions) => {
    if (!permissions || !Array.isArray(permissions)) return [];
    return permissions.filter((permission) =>
      validation.isValidPermission(permission),
    );
  },

  // Validate categories array
  validateCategories: (categories) => {
    if (!categories || !Array.isArray(categories)) return [];
    return categories.filter((category) =>
      validation.isValidCategory(category),
    );
  },
};

module.exports = validation;
