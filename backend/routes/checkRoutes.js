const router = require("express").Router();

const auth = require("../middlewares/authMiddleware");
const role = require("../middlewares/roleMiddleware");

const {
  scanPass,
  getLogs
} = require("../controllers/checkController");


// security scans QR
router.post(
  "/scan",
  auth,
  role("security", "admin"),
  scanPass
);


// admin view logs
router.get(
  "/logs",
  auth,
  role("admin"),
  getLogs
);

module.exports = router;