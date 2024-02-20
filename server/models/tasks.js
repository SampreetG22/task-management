const mongoose = require("mongoose");

const tasksSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    created: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Tasks = mongoose.model("Tasks", tasksSchema);

module.exports = {
  Tasks: Tasks,
  markedAsDone: [],
};
