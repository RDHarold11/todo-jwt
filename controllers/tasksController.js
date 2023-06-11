const Task = require("../models/taskModel");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

const getTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find({ user: req.user.id });
  res.status(200).json(tasks);
});

const getTaskByFavorite = asyncHandler(async (req, res) => {
  const tasks = await Task.find({ user: req.user.id, isFavorite: true });
  res.status(200).json(tasks);
});

const createTaks = asyncHandler(async (req, res) => {
  if (!req.body.title) {
    res.status(400).json({ msg: "You must complete the fields" });
  }
  const task = await Task.create({
    user: req.user.id,
    title: req.body.title,
    description: req.body.description,
    category: req.body.category,
    isFavorite: false,
    img: "",
  });
  res.status(200).json(task);
});

const deleteTasks = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) {
    res.status(400).json({ msg: `No task with id: ${req.params.id}` });
  }
  if (!req.user) {
    res.status(401).json({ msg: "No user" });
  }
  if (task.user.toString() !== req.user.id) {
    res.status(401).json({ msg: "Not authorized" });
  }
  await task.deleteOne();
  res.status(200).json({ id: req.params.id });
});

const addToFavorite = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) {
    res.status(400).json({ msg: `There is no task with id: ${req.params.id}` });
  }
  if (!req.user) {
    res.status(400).json({ msg: `No user` });
  }
  if (task.user.toString() !== req.user.id) {
    res.status(401).json({ msg: "User not authorized" });
  }
  /* console.log(task.user, req.user.id); */
  task.isFavorite = !task.isFavorite;
  const result = await task.save();
  res.status(200).json(result);
});

const updateTaks = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) {
    res
      .status(400)
      .json({ msg: `There is not a task with id: ${req.params.id}` });
  }
  if (!req.user) {
    res.status(401).json({ msg: "User not found" });
  }
  if (task.user.toString() !== req.user.id) {
    res.status(401).json({ msg: "User not authorized" });
  }
  const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedTask);
});

module.exports = {
  getTasks,
  deleteTasks,
  updateTaks,
  getTaskByFavorite,
  createTaks,
  addToFavorite,
};
