const { Router } = require("express");
const router = Router();
const {
  createTaks,
  updateTaks,
  deleteTasks,
  getTasks,
  addToFavorite,
  getTaskByFavorite,
} = require("../controllers/tasksController");
const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getTasks).post(protect, createTaks);
router.get("/favorites/:id", protect, addToFavorite);
router.route("/:id").delete(protect, deleteTasks).put(protect, updateTaks);

module.exports = router;
