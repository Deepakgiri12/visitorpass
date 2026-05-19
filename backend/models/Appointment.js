const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  visitorName: String,
  visitorPhone: String,
  visitorEmail: String,

  host: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  date: Date,
  purpose: String,

  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending"
  }

}, { timestamps: true });

module.exports = mongoose.model("Appointment", appointmentSchema);