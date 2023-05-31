const { Router } = require("express");
const router = Router();
const {
  createTaks,
  updateTaks,
  deleteTasks,
  getTasks,
} = require("../controllers/tasksController");
const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getTasks).post(protect, createTaks);
router.route("/:id").delete(protect, deleteTasks).put(protect, updateTaks);

module.exports = router;
