import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

const taskModel = mongoose.model("Task", taskSchema);

export default taskModel;