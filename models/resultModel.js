const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  totalMarks: {
    type: Number,
    required: true,
  },
  passMarks: {
    type: Number,
    required: true,
  },
});

const resultSchema = new mongoose.Schema(
  {
    createdBy: {
      type: String,
      required: true,
    },
    exam: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    sem: {
      type: String,
      required: true,
    },
    branch: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    subjects: {
      type: [subjectSchema],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("results", resultSchema);
