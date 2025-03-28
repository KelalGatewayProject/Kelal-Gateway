const express = require("express");
const router = express.Router();
const StaffMember = require("../models/StaffMember");
const Event = require("../models/Event");
const { auth, isOrganizer } = require("../middleware/auth");
const validation = require("../utils/validation");

// @route   GET /api/staff/event/:eventId
// @desc    Get all staff members for an event
// @access  Private (Organizer only)
router.get("/event/:eventId", auth, async (req, res) => {
  // Validate event ID
  if (!validation.isValidObjectId(req.params.eventId)) {
    return res.status(400).json({ error: "Invalid event ID format" });
  }
  try {
    const event = await Event.findById(req.params.eventId);

    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    // Check if user is the event organizer
    if (event.organizer.toString() !== req.userId.toString()) {
      return res
        .status(403)
        .json({ error: "Not authorized to view staff for this event" });
    }

    const staffMembers = await StaffMember.find({
      event_id: req.params.eventId,
    });

    res.json(staffMembers);
  } catch (error) {
    console.error("Get staff error:", error.message);
    res.status(500).json({ error: "Server error" });
  }
});

// @route   POST /api/staff
// @desc    Add a staff member to an event
// @access  Private (Organizer only)
router.post("/", auth, isOrganizer, async (req, res) => {
  try {
    const { name, phone, position, event_id, permissions } = req.body;

    // Validate required fields
    if (!name || !position || !event_id) {
      return res
        .status(400)
        .json({ error: "Name, position, and event ID are required" });
    }

    // Validate IDs
    if (!validation.isValidObjectId(event_id)) {
      return res.status(400).json({ error: "Invalid event ID format" });
    }

    // Validate phone if provided
    if (phone && !validation.isValidPhone(phone)) {
      return res.status(400).json({ error: "Invalid phone number format" });
    }

    // Validate position
    if (!validation.isValidStaffPosition(position)) {
      return res.status(400).json({ error: "Invalid staff position" });
    }

    // Validate permissions if provided
    if (permissions && !Array.isArray(permissions)) {
      return res.status(400).json({ error: "Permissions must be an array" });
    }

    // Check if event exists and user is the organizer
    const event = await Event.findById(event_id);

    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    if (event.organizer.toString() !== req.userId.toString()) {
      return res
        .status(403)
        .json({ error: "Not authorized to add staff to this event" });
    }

    // Create new staff member with sanitized inputs
    const newStaffMember = new StaffMember({
      name: validation.sanitizeString(name),
      phone: phone ? phone.trim() : "",
      position: position.toLowerCase(),
      event_id,
      permissions: validation.validatePermissions(permissions || []),
    });

    const staffMember = await newStaffMember.save();

    res.status(201).json(staffMember);
  } catch (error) {
    console.error("Add staff error:", error.message);
    res.status(500).json({ error: "Server error" });
  }
});

// @route   PUT /api/staff/:id
// @desc    Update a staff member
// @access  Private (Organizer only)
router.put("/:id", auth, isOrganizer, async (req, res) => {
  // Validate staff ID
  if (!validation.isValidObjectId(req.params.id)) {
    return res.status(400).json({ error: "Invalid staff ID format" });
  }

  // Validate and sanitize inputs
  const updates = {};
  const { name, phone, position, permissions } = req.body;

  if (name) updates.name = validation.sanitizeString(name);

  if (phone) {
    if (!validation.isValidPhone(phone)) {
      return res.status(400).json({ error: "Invalid phone number format" });
    }
    updates.phone = phone.trim();
  }

  if (position) {
    if (!validation.isValidStaffPosition(position)) {
      return res.status(400).json({ error: "Invalid staff position" });
    }
    updates.position = position.toLowerCase();
  }

  if (permissions) {
    if (!Array.isArray(permissions)) {
      return res.status(400).json({ error: "Permissions must be an array" });
    }
    updates.permissions = validation.validatePermissions(permissions);
  }
  try {
    const staffMember = await StaffMember.findById(req.params.id);

    if (!staffMember) {
      return res.status(404).json({ error: "Staff member not found" });
    }

    // Check if user is the event organizer
    const event = await Event.findById(staffMember.event_id);

    if (event.organizer.toString() !== req.userId.toString()) {
      return res
        .status(403)
        .json({ error: "Not authorized to update staff for this event" });
    }

    // Update staff member with sanitized data
    const updatedStaffMember = await StaffMember.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      { new: true },
    );

    res.json(updatedStaffMember);
  } catch (error) {
    console.error("Update staff error:", error.message);
    res.status(500).json({ error: "Server error" });
  }
});

// @route   DELETE /api/staff/:id
// @desc    Delete a staff member
// @access  Private (Organizer only)
router.delete("/:id", auth, isOrganizer, async (req, res) => {
  // Validate staff ID
  if (!validation.isValidObjectId(req.params.id)) {
    return res.status(400).json({ error: "Invalid staff ID format" });
  }
  try {
    const staffMember = await StaffMember.findById(req.params.id);

    if (!staffMember) {
      return res.status(404).json({ error: "Staff member not found" });
    }

    // Check if user is the event organizer
    const event = await Event.findById(staffMember.event_id);

    if (event.organizer.toString() !== req.userId.toString()) {
      return res
        .status(403)
        .json({ error: "Not authorized to delete staff for this event" });
    }

    await staffMember.remove();

    res.json({ message: "Staff member removed" });
  } catch (error) {
    console.error("Delete staff error:", error.message);
    res.status(500).json({ error: "Server error" });
  }
});

// @route   PUT /api/staff/:id/accept
// @desc    Accept a staff position
// @access  Public (with token)
router.put("/:id/accept", async (req, res) => {
  // Validate staff ID
  if (!validation.isValidObjectId(req.params.id)) {
    return res.status(400).json({ error: "Invalid staff ID format" });
  }
  try {
    const staffMember = await StaffMember.findById(req.params.id);

    if (!staffMember) {
      return res.status(404).json({ error: "Staff position not found" });
    }

    // Update acceptance status
    staffMember.accepted = true;
    await staffMember.save();

    res.json({
      success: true,
      message: "Staff position accepted",
      staffMember,
    });
  } catch (error) {
    console.error("Accept staff position error:", error.message);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
