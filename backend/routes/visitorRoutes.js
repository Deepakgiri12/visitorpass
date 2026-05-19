const router = require("express").Router();
const upload = require("../middlewares/uploadMiddleware");
const auth = require("../middlewares/authMiddleware");
const role = require("../middlewares/roleMiddleware");

const {
  addVisitor,
  getVisitors
} = require("../controllers/visitorController");


// Only security or admin can add visitor
router.post(
  "/",
  auth,
  role("admin", "security"),
  upload.single("photo"),
  addVisitor
);


// Admin only
router.get(
  "/",
  auth,
  role("admin"),
  getVisitors
);

module.exports = router;