const express = require("express");
const router = express.Router();
const { Tasks, markedAsDone } = require("../models/tasks");
router.get("/", (req, res) => {
  res.send("Server Running Now");
});

router.get("/getTasks", async (req, res) => {
  try {
    const tasks = await Tasks.find();
    res.status(200).json({
      taskData: tasks,
      markedAsDone: markedAsDone,
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.post("/addTask", async (req, res) => {
  try {
    const task = await Tasks.create(req.body);
    res.status(200).json(task);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

router.delete("/deleteTask/:id", async (req, res) => {
  try {
    await Tasks.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.put("/markAsDone", async (req, res) => {
  try {
    const newList = req.body.markedList;
    markedAsDone.splice(0, markedAsDone.length, ...newList);
    res
      .status(200)
      .json({ message: "Marked as done list updated successfully" });
  } catch (error) {
    res.status(500).json(error.message);
  }
});

module.exports = router;
