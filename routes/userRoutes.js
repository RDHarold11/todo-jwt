const { Router } = require("express");
const router = Router();
const {
  loginUser,
  registerUser,
  getMe,
} = require("../controllers/userControllers");

const { protect } = require("../middleware/authMiddleware");

router.post("/login", loginUser);
router.post("/register", registerUser);
router.get("/me", protect, getMe);
module.exports = router;
