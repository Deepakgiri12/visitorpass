const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/passes", express.static("passes"));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/visitors", require("./routes/visitorRoutes"));
app.use("/api/appointments", require("./routes/appointmentRoutes"));
app.use("/api/pass", require("./routes/passRoutes"));
app.use("/api/check", require("./routes/checkRoutes"));
app.use("/uploads", express.static("uploads"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));