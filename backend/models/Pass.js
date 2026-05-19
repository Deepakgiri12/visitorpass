const mongoose = require("mongoose");

const passSchema = new mongoose.Schema({
  appointment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Appointment"
  },

  visitorName: String,
  visitorPhone: String,

  qrCode: String,
  pdfPath: String,

  valid: {
    type: Boolean,
    default: true
  }

}, { timestamps: true });

module.exports = mongoose.model("Pass", passSchema);