const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  event_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    required: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  ticket_type: {
    type: String,
    default: "General Admission",
  },
  ticket_price: {
    type: String,
    required: true,
  },
  purchase_date: {
    type: Date,
    default: Date.now,
  },
  is_checked_in: {
    type: Boolean,
    default: false,
  },
  check_in_time: {
    type: Date,
  },
  qr_code: {
    type: String,
  },
});

const Ticket = mongoose.model("Ticket", ticketSchema);

module.exports = Ticket;
