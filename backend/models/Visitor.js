const mongoose = require("mongoose");

const visitorSchema = new mongoose.Schema({
  name: String,
  phone: String,
  purpose: String,
  photo: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Visitor", visitorSchema);