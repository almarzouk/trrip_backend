const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  task: { type: String, required: true }, // Use 'task' instead of 'title'
  isCompleted: { type: Boolean, default: false }, // Use 'isCompleted'
  dueDate: { type: Date },
});

module.exports = mongoose.model("Task", taskSchema);
