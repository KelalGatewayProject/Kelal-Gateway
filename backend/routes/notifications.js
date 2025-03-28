const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Event = require("../models/Event");
const Ticket = require("../models/Ticket");
const {
  sendTicketPurchaseEmail,
  sendEventUpdateEmail,
} = require("../utils/emailService");
const auth = require("../middleware/auth");

// @route   POST /api/notifications/ticket-purchase
// @desc    Send ticket purchase notification
// @access  Private
router.post("/ticket-purchase", auth, async (req, res) => {
  try {
    const { ticketId, eventId } = req.body;

    // Get ticket and event details
    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      return res.status(404).json({ error: "Ticket not found" });
    }

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    // Get user details
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if user wants email notifications
    if (user.emailNotifications) {
      // Send email notification
      await sendTicketPurchaseEmail(user.email, user.name, ticket, event);
    }

    res.json({ message: "Ticket purchase notification sent successfully" });
  } catch (error) {
    console.error("Ticket purchase notification error:", error.message);
    res.status(500).json({ error: "Server error" });
  }
});

// @route   POST /api/notifications/event-update
// @desc    Send event update notification to all ticket holders
// @access  Private (organizers only)
router.post("/event-update", auth, async (req, res) => {
  try {
    const { eventId, updateType, message } = req.body;

    // Get event details
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    // Check if user is the event organizer
    if (event.organizer.toString() !== req.user.id) {
      return res.status(403).json({ error: "Not authorized" });
    }

    // Get all tickets for this event
    const tickets = await Ticket.find({ event: eventId });

    // Get unique user IDs from tickets
    const userIds = [
      ...new Set(tickets.map((ticket) => ticket.user.toString())),
    ];

    // Get users who want email notifications
    const users = await User.find({
      _id: { $in: userIds },
      emailNotifications: true,
    });

    // Send email notifications to all users
    const emailPromises = users.map((user) => {
      return sendEventUpdateEmail(
        user.email,
        user.name,
        event,
        updateType,
        message,
      );
    });

    await Promise.all(emailPromises);

    res.json({
      message: `Event update notification sent to ${users.length} users`,
    });
  } catch (error) {
    console.error("Event update notification error:", error.message);
    res.status(500).json({ error: "Server error" });
  }
});

// @route   PUT /api/notifications/settings
// @desc    Update user notification settings
// @access  Private
router.put("/settings", auth, async (req, res) => {
  try {
    const { emailNotifications } = req.body;

    // Update user notification settings
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { emailNotifications },
      { new: true },
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({
      message: "Notification settings updated successfully",
      emailNotifications: user.emailNotifications,
    });
  } catch (error) {
    console.error("Update notification settings error:", error.message);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
