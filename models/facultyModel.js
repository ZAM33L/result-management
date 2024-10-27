const mongoose = require("mongoose");
const facultySchema = new mongoose.Schema({
  facultyID: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  faculty: {
    type: String,
    required: true,
  },
  isApproved: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Faculty", facultySchema);
