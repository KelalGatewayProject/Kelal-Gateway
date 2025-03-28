const express = require("express");
const router = express.Router();
const Event = require("../models/Event");
const Ticket = require("../models/Ticket");
const StaffMember = require("../models/StaffMember");
const { auth, isOrganizer } = require("../middleware/auth");
const validation = require("../utils/validation");

// @route   GET /api/events
// @desc    Get all events
// @access  Public
router.get("/", async (req, res) => {
  try {
    const events = await Event.find({ status: "published" })
      .sort({ event_date: 1 })
      .limit(20);

    res.json(events);
  } catch (error) {
    console.error("Get events error:", error.message);
    res.status(500).json({ error: "Server error" });
  }
});

// @route   GET /api/events/:id
// @desc    Get event by ID
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    res.json(event);
  } catch (error) {
    console.error("Get event error:", error.message);
    if (error.kind === "ObjectId") {
      return res.status(404).json({ error: "Event not found" });
    }
    res.status(500).json({ error: "Server error" });
  }
});

// @route   POST /api/events
// @desc    Create a new event
// @access  Private (Organizer only)
router.post("/", auth, isOrganizer, async (req, res) => {
  try {
    const {
      title,
      description,
      event_date,
      start_time,
      end_time,
      venue,
      venue_name,
      location,
      price,
      capacity,
      image_url,
      categories,
      status,
    } = req.body;

    // Validate required fields
    if (
      !title ||
      !description ||
      !event_date ||
      !start_time ||
      !end_time ||
      !venue_name ||
      !location
    ) {
      return res
        .status(400)
        .json({ error: "Missing required event information" });
    }

    // Validate date and time formats
    if (!validation.isValidDate(event_date)) {
      return res.status(400).json({ error: "Invalid event date format" });
    }

    if (
      !validation.isValidTime(start_time) ||
      !validation.isValidTime(end_time)
    ) {
      return res
        .status(400)
        .json({ error: "Invalid time format. Use HH:MM format" });
    }

    // Validate price and capacity
    if (price !== undefined && !validation.isValidPrice(price)) {
      return res.status(400).json({ error: "Price must be a positive number" });
    }

    if (capacity !== undefined && !validation.isValidCapacity(capacity)) {
      return res
        .status(400)
        .json({ error: "Capacity must be a positive integer" });
    }

    // Validate image URL if provided
    if (image_url && !validation.isValidURL(image_url)) {
      return res.status(400).json({ error: "Invalid image URL" });
    }

    // Validate status if provided
    if (status && !validation.isValidEventStatus(status)) {
      return res.status(400).json({ error: "Invalid event status" });
    }

    // Validate and sanitize categories
    const validatedCategories = validation.validateCategories(categories);
    if (
      categories &&
      categories.length > 0 &&
      validatedCategories.length === 0
    ) {
      return res.status(400).json({ error: "No valid categories provided" });
    }

    // Create new event with sanitized inputs
    const newEvent = new Event({
      title: validation.sanitizeString(title),
      description: validation.sanitizeString(description),
      organizer: req.userId,
      organizer_name: req.user.name,
      event_date,
      start_time,
      end_time,
      venue: venue ? validation.sanitizeString(venue) : "",
      venue_name: validation.sanitizeString(venue_name),
      location: validation.sanitizeString(location),
      price,
      capacity,
      image_url: image_url ? image_url.trim() : "",
      categories: validatedCategories,
      status: status ? status.toLowerCase() : "draft",
    });

    const event = await newEvent.save();

    res.status(201).json(event);
  } catch (error) {
    console.error("Create event error:", error.message);
    res.status(500).json({ error: "Server error" });
  }
});

// @route   PUT /api/events/:id
// @desc    Update an event
// @access  Private (Organizer only)
router.put("/:id", auth, isOrganizer, async (req, res) => {
  // Validate event ID
  if (!validation.isValidObjectId(req.params.id)) {
    return res.status(400).json({ error: "Invalid event ID format" });
  }

  // Validate and sanitize inputs
  const updates = {};
  const {
    title,
    description,
    event_date,
    start_time,
    end_time,
    venue,
    venue_name,
    location,
    price,
    capacity,
    image_url,
    categories,
    status,
  } = req.body;

  // Validate date and time if provided
  if (event_date && !validation.isValidDate(event_date)) {
    return res.status(400).json({ error: "Invalid event date format" });
  }

  if (start_time && !validation.isValidTime(start_time)) {
    return res
      .status(400)
      .json({ error: "Invalid start time format. Use HH:MM format" });
  }

  if (end_time && !validation.isValidTime(end_time)) {
    return res
      .status(400)
      .json({ error: "Invalid end time format. Use HH:MM format" });
  }

  // Validate price and capacity if provided
  if (price !== undefined && !validation.isValidPrice(price)) {
    return res.status(400).json({ error: "Price must be a positive number" });
  }

  if (capacity !== undefined && !validation.isValidCapacity(capacity)) {
    return res
      .status(400)
      .json({ error: "Capacity must be a positive integer" });
  }

  // Validate image URL if provided
  if (image_url && !validation.isValidURL(image_url)) {
    return res.status(400).json({ error: "Invalid image URL" });
  }

  // Validate status if provided
  if (status && !validation.isValidEventStatus(status)) {
    return res.status(400).json({ error: "Invalid event status" });
  }

  // Sanitize inputs
  if (title) updates.title = validation.sanitizeString(title);
  if (description) updates.description = validation.sanitizeString(description);
  if (event_date) updates.event_date = event_date;
  if (start_time) updates.start_time = start_time;
  if (end_time) updates.end_time = end_time;
  if (venue) updates.venue = validation.sanitizeString(venue);
  if (venue_name) updates.venue_name = validation.sanitizeString(venue_name);
  if (location) updates.location = validation.sanitizeString(location);
  if (price !== undefined) updates.price = price;
  if (capacity !== undefined) updates.capacity = capacity;
  if (image_url) updates.image_url = image_url.trim();
  if (status) updates.status = status.toLowerCase();

  // Validate and sanitize categories if provided
  if (categories) {
    const validatedCategories = validation.validateCategories(categories);
    if (categories.length > 0 && validatedCategories.length === 0) {
      return res.status(400).json({ error: "No valid categories provided" });
    }
    updates.categories = validatedCategories;
  }
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    // Check if user is the event organizer
    if (event.organizer.toString() !== req.userId.toString()) {
      return res
        .status(403)
        .json({ error: "Not authorized to update this event" });
    }

    // Update fields with sanitized data
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      { new: true },
    );

    res.json(updatedEvent);
  } catch (error) {
    console.error("Update event error:", error.message);
    res.status(500).json({ error: "Server error" });
  }
});

// @route   DELETE /api/events/:id
// @desc    Delete an event
// @access  Private (Organizer only)
router.delete("/:id", auth, isOrganizer, async (req, res) => {
  // Validate event ID
  if (!validation.isValidObjectId(req.params.id)) {
    return res.status(400).json({ error: "Invalid event ID format" });
  }
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    // Check if user is the event organizer
    if (event.organizer.toString() !== req.userId.toString()) {
      return res
        .status(403)
        .json({ error: "Not authorized to delete this event" });
    }

    await event.remove();

    res.json({ message: "Event removed" });
  } catch (error) {
    console.error("Delete event error:", error.message);
    res.status(500).json({ error: "Server error" });
  }
});

// @route   GET /api/events/category/:category
// @desc    Get events by category
// @access  Public
router.get("/category/:category", async (req, res) => {
  // Validate category
  if (!validation.isValidCategory(req.params.category)) {
    return res.status(400).json({ error: "Invalid category" });
  }
  try {
    const category = req.params.category.toUpperCase();
    const events = await Event.find({
      categories: category,
      status: "published",
    }).sort({ event_date: 1 });

    res.json(events);
  } catch (error) {
    console.error("Get events by category error:", error.message);
    res.status(500).json({ error: "Server error" });
  }
});

// @route   POST /api/events/:id/check-in
// @desc    Check in a ticket for an event
// @access  Private
router.post("/:id/check-in", auth, async (req, res) => {
  try {
    const { ticketId, userId } = req.body;

    // Validate IDs
    if (!validation.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid event ID format",
      });
    }

    if (!validation.isValidObjectId(ticketId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid ticket ID format",
      });
    }

    if (!validation.isValidObjectId(userId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID format",
      });
    }

    // Find the ticket
    const ticket = await Ticket.findOne({
      _id: ticketId,
      event_id: req.params.id,
      user_id: userId,
    });

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: "Ticket not found",
      });
    }

    // Check if ticket is already checked in
    if (ticket.is_checked_in) {
      return res.status(400).json({
        success: false,
        message: "Ticket already checked in",
      });
    }

    // Update ticket status
    ticket.is_checked_in = true;
    ticket.check_in_time = new Date();
    await ticket.save();

    res.json({
      success: true,
      message: "Check-in successful",
      ticket,
    });
  } catch (error) {
    console.error("Check-in error:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

// @route   POST /api/events/:id/redeem-voucher
// @desc    Redeem a drink voucher for an event
// @access  Private
router.post("/:id/redeem-voucher", auth, async (req, res) => {
  try {
    const { voucherId, userId } = req.body;

    // In a real app, you would have a Voucher model
    // For now, we'll simulate voucher validation

    // Simulate a successful redemption
    res.json({
      success: true,
      message: "Voucher redeemed successfully",
    });
  } catch (error) {
    console.error("Voucher redemption error:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

// @route   GET /api/events/organizer/my-events
// @desc    Get events created by the logged-in organizer
// @access  Private (Organizer only)
router.get("/organizer/my-events", auth, isOrganizer, async (req, res) => {
  try {
    const events = await Event.find({ organizer: req.userId }).sort({
      created_at: -1,
    });

    res.json(events);
  } catch (error) {
    console.error("Get organizer events error:", error.message);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
