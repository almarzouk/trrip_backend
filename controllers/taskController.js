const Task = require("../models/taskModel");

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: "Error fetching tasks" });
  }
};

exports.addTask = async (req, res) => {
  const { task, isCompleted, dueDate } = req.body; // Use correct field names
  try {
    const newTask = new Task({ task, isCompleted, dueDate });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    console.error("Error adding task:", error);
    res.status(500).json({ error: "Error adding task" });
  }
};

exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const { task, isCompleted, dueDate } = req.body; // Ensure you use the correct fields
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { task, isCompleted, dueDate }, // Update the task
      { new: true }
    );
    res.json(updatedTask);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ error: "Error updating task" });
  }
};

exports.deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    await Task.findByIdAndDelete(id);
    res.json({ message: "Task deleted" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ error: "Error deleting task" });
  }
};
