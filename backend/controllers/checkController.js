const Pass = require("../models/Pass");
const CheckLog = require("../models/CheckLog");


// Scan QR → checkin / checkout
exports.scanPass = async (req, res) => {
  try {

    const { passId } = req.body;

    const pass = await Pass.findById(passId);

    if (!pass || !pass.valid) {
      return res.status(400).json({
        msg: "Invalid pass"
      });
    }

    // find log
    let log = await CheckLog.findOne({
      pass: pass._id,
      status: "inside"
    });

    // -------- CHECK IN --------
    if (!log) {

      log = await CheckLog.create({
        pass: pass._id,
        visitorName: pass.visitorName,
        checkInTime: new Date(),
        status: "inside"
      });

      return res.json({
        msg: "Checked In",
        log
      });
    }

    // -------- CHECK OUT --------
    log.checkOutTime = new Date();
    log.status = "outside";

    await log.save();

    res.json({
      msg: "Checked Out",
      log
    });

  } catch (err) {
    res.status(500).json({
      msg: err.message
    });
  }
};



// Get all logs (Admin)
exports.getLogs = async (req, res) => {

  const logs = await CheckLog.find()
    .populate("pass");

  res.json(logs);
};