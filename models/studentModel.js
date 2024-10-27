const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  roll: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  sem: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  branch: {
    type: String,
    required: true,
  },
  passing: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  results: {
    type: Array,
    required: true,
  },
});



module.exports = mongoose.model("students", studentSchema);
