const router = require("express").Router();

const auth = require("../middlewares/authMiddleware");
const role = require("../middlewares/roleMiddleware");

const {
  createAppointment,
  approveAppointment,
  rejectAppointment,
  getAppointments,
  getMyAppointments
} = require("../controllers/appointmentController");


// Create → employee or visitor
router.post(
  "/",
  auth,
  role("employee", "visitor"),
  createAppointment
);


// Approve → employee only
router.put(
  "/approve/:id",
  auth,
  role("employee"),
  approveAppointment
);


// Reject → employee only
router.put(
  "/reject/:id",
  auth,
  role("employee"),
  rejectAppointment
);


// Admin & security → view all
router.get(
  "/",
  auth,
  role("admin", "security"),
  getAppointments
);


// Employee → view own
router.get(
  "/my",
  auth,
  role("employee"),
  getMyAppointments
);

module.exports = router;