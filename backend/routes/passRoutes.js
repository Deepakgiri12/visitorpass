const router = require("express").Router();

const auth = require("../middlewares/authMiddleware");
const role = require("../middlewares/roleMiddleware");

const {
  generatePass
} = require("../controllers/passController");


// Only employee / admin can generate pass
router.post(
  "/:id",
  auth,
  role("employee", "admin"),
  generatePass
);

module.exports = router;