const Visitor = require("../models/Visitor");
const QRCode = require("qrcode");

exports.addVisitor = async (req, res) => {
    try {
  const { name, phone, purpose } = req.body;
  const photo=req.file?req.file.filename:null;


  const visitor = await Visitor.create({ name, phone, purpose, photo });

  const qr = await QRCode.toDataURL(visitor._id.toString());

  res.json({ visitor, qr });
} catch (err) {
  res.status(500).json({ msg: err.message });
}   
};

exports.getVisitors = async (req, res) => {
  const visitors = await Visitor.find();
  res.json(visitors);
};