const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  organizer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  organizer_name: {
    type: String,
    required: true,
  },
  event_date: {
    type: Date,
    required: true,
  },
  start_time: {
    type: String,
    required: true,
  },
  end_time: {
    type: String,
  },
  venue: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Venue",
  },
  venue_name: {
    type: String,
  },
  location: {
    address: String,
    city: String,
    coordinates: {
      lat: Number,
      lng: Number,
    },
  },
  price: {
    type: Number,
    default: 0,
  },
  capacity: {
    type: Number,
  },
  image_url: {
    type: String,
  },
  categories: [
    {
      type: String,
    },
  ],
  status: {
    type: String,
    enum: ["draft", "published", "cancelled"],
    default: "draft",
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
