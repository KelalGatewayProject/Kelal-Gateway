const express = require("express");
const router = express.Router();
const Ticket = require("../models/Ticket");
const Event = require("../models/Event");
const { auth } = require("../middleware/auth");
const crypto = require("crypto");
const validation = require("../utils/validation");

// @route   GET /api/tickets/my-tickets
// @desc    Get all tickets for the logged-in user
// @access  Private
router.get("/my-tickets", auth, async (req, res) => {
  try {
    const tickets = await Ticket.find({ user_id: req.userId })
      .populate("event_id", "title event_date start_time venue_name image_url")
      .sort({ purchase_date: -1 });

    res.json(tickets);
  } catch (error) {
    console.error("Get tickets error:", error.message);
    res.status(500).json({ error: "Server error" });
  }
});

// @route   GET /api/tickets/:id
// @desc    Get ticket by ID
// @access  Private
router.get("/:id", auth, async (req, res) => {
  // Validate ticket ID
  if (!validation.isValidObjectId(req.params.id)) {
    return res.status(400).json({ error: "Invalid ticket ID format" });
  }
  try {
    const ticket = await Ticket.findById(req.params.id).populate(
      "event_id",
      "title event_date start_time venue_name image_url",
    );

    if (!ticket) {
      return res.status(404).json({ error: "Ticket not found" });
    }

    // Check if user owns the ticket or is the event organizer
    const event = await Event.findById(ticket.event_id);

    if (
      ticket.user_id.toString() !== req.userId.toString() &&
      event.organizer.toString() !== req.userId.toString()
    ) {
      return res
        .status(403)
        .json({ error: "Not authorized to view this ticket" });
    }

    res.json(ticket);
  } catch (error) {
    console.error("Get ticket error:", error.message);
    res.status(500).json({ error: "Server error" });
  }
});

// @route   POST /api/tickets/purchase
// @desc    Purchase a ticket for an event
// @access  Private
router.post("/purchase", auth, async (req, res) => {
  try {
    const { eventId, ticketType, ticketPrice } = req.body;

    // Validate required fields
    if (!eventId) {
      return res.status(400).json({ error: "Event ID is required" });
    }

    // Validate event ID
    if (!validation.isValidObjectId(eventId)) {
      return res.status(400).json({ error: "Invalid event ID format" });
    }

    // Validate ticket price if provided
    if (ticketPrice !== undefined && !validation.isValidPrice(ticketPrice)) {
      return res
        .status(400)
        .json({ error: "Ticket price must be a positive number" });
    }

    // Check if event exists
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    // Generate QR code data
    const qrData = {
      type: "event_ticket",
      eventId: event._id,
      userId: req.userId,
      ticketType,
      timestamp: new Date().toISOString(),
    };

    // Create a unique QR code string
    const qrCode = crypto
      .createHash("sha256")
      .update(JSON.stringify(qrData) + Date.now())
      .digest("hex");

    // Create new ticket with sanitized inputs
    const newTicket = new Ticket({
      event_id: eventId,
      user_id: req.userId,
      ticket_type: ticketType
        ? validation.sanitizeString(ticketType)
        : "General Admission",
      ticket_price: ticketPrice || event.price.toString(),
      qr_code: qrCode,
    });

    const ticket = await newTicket.save();

    // Populate event details
    await ticket.populate(
      "event_id",
      "title event_date start_time venue_name image_url",
    );

    res.status(201).json({
      ticket,
      qrData: JSON.stringify(qrData),
    });
  } catch (error) {
    console.error("Purchase ticket error:", error.message);
    res.status(500).json({ error: "Server error" });
  }
});

// @route   GET /api/tickets/validate/:qrCode
// @desc    Validate a ticket QR code
// @access  Private
router.get("/validate/:qrCode", auth, async (req, res) => {
  // Validate QR code
  if (!req.params.qrCode || req.params.qrCode.length < 10) {
    return res.status(400).json({
      valid: false,
      message: "Invalid QR code format",
    });
  }
  try {
    const ticket = await Ticket.findOne({ qr_code: req.params.qrCode });

    if (!ticket) {
      return res.status(404).json({
        valid: false,
        message: "Invalid ticket",
      });
    }

    // Check if ticket is already checked in
    if (ticket.is_checked_in) {
      return res.status(400).json({
        valid: false,
        message: "Ticket already used",
      });
    }

    res.json({
      valid: true,
      message: "Valid ticket",
      ticket,
    });
  } catch (error) {
    console.error("Validate ticket error:", error.message);
    res.status(500).json({
      valid: false,
      message: "Server error",
    });
  }
});

module.exports = router;
