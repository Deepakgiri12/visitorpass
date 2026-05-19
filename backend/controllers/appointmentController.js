const Appointment = require("../models/Appointment");
const sendEmail = require("../utils/sendEmail");

// 1. Create Appointment (Visitor or Employee)
exports.createAppointment = async (req, res) => {
  try {
    const { visitorName, visitorPhone, visitorEmail, date, purpose } = req.body;

    const appointment = await Appointment.create({
      visitorName,
      visitorPhone,
      visitorEmail,
      date,
      purpose,
      host: req.user.id   // logged-in employee
    });

    // Send email notification to visitor
    await sendEmail(
      visitorEmail,
      "Appointment Created",
      `Hello ${visitorName}, your appointment has been created for ${date}.`
    );

    res.json({
        msg:"Approved",
        appointment
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};


// 2. Approve Appointment (Employee)
exports.approveAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    appointment.status = "approved";
    await appointment.save();

    res.json({ msg: "Approved", appointment });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};


// 3. Reject Appointment
exports.rejectAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    appointment.status = "rejected";
    await appointment.save();

    res.json({ msg: "Rejected", appointment });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};


// 4. Get All Appointments (Admin / Security)
exports.getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate("host", "name email");

    res.json(appointments);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};


// 5. Get My Appointments (Employee)
exports.getMyAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({
      host: req.user.id
    });

    res.json(appointments);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};