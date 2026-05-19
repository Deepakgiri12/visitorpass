const Pass = require("../models/Pass");
const Appointment = require("../models/Appointment");
const sendEmail = require("../utils/sendEmail");

const QRCode = require("qrcode");
const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");


exports.generatePass = async (req, res) => {
  try {

    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ msg: "No appointment" });
    }

    if (appointment.status !== "approved") {
      return res.status(400).json({
        msg: "Appointment not approved"
      });
    }

    // ---------- QR ----------
    const qrData = appointment._id.toString();

    const qrImage = await QRCode.toDataURL(qrData);

    // ---------- PDF ----------
    const pdfName = `pass_${appointment._id}.pdf`;
    const pdfPath = path.join(
      __dirname,
      "../passes",
      pdfName
    );

    const doc = new PDFDocument();

    doc.pipe(fs.createWriteStream(pdfPath));

    doc.fontSize(20).text("Visitor Pass");

    doc.text(`Name: ${appointment.visitorName}`);
    doc.text(`Phone: ${appointment.visitorPhone}`);
    doc.text(`Purpose: ${appointment.purpose}`);

    doc.text(`Date: ${appointment.date}`);

    doc.end();

    // ---------- Save Pass ----------
    const pass = await Pass.create({
      appointment: appointment._id,
      visitorName: appointment.visitorName,
      visitorPhone: appointment.visitorPhone,
      qrCode: qrImage,
      pdfPath: pdfName
    });

    await sendEmail(
      appointment.visitorEmail,
      "Visitor Pass Generated",
      "Your visitor pass is ready"
    );

    res.json(pass);

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};