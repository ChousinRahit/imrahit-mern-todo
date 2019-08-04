const mongoose = require("mongoose");

const TodoSchema = mongoose.Schema({
  subject: {
    type: String,
    required: true
  },
  desc: {
    type: String
  },
  priority: {
    type: String
  },
  addTo: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Todo = mongoose.model("myTodo", TodoSchema);
