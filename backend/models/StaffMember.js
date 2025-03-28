const mongoose = require("mongoose");

const staffMemberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  position: {
    type: String,
    required: true,
  },
  event_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    required: true,
  },
  permissions: [
    {
      type: String,
      enum: [
        "scan_tickets",
        "scan_drinks",
        "manage_staff",
        "view_analytics",
        "view_guest_list",
        "view_schedule",
      ],
    },
  ],
  accepted: {
    type: Boolean,
    default: false,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const StaffMember = mongoose.model("StaffMember", staffMemberSchema);

module.exports = StaffMember;
