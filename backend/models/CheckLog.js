const mongoose = require("mongoose");

const checkLogSchema = new mongoose.Schema({

  pass: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pass"
  },

  visitorName: String,

  checkInTime: Date,

  checkOutTime: Date,

  status: {
    type: String,
    enum: ["inside", "outside"],
    default: "outside"
  }

}, { timestamps: true });

module.exports = mongoose.model("CheckLog", checkLogSchema);