const express = require("express");
const router = express.Router();
const Result = require("../models/resultModel");
const authMiddleware = require("../middleware/authMiddleware");
const Student = require("../models/studentModel");

//add result
router.post("/add-result", async (req, res) => {
  const { createdBy, exam, year, sem, branch, date, subjects } = req.body;
  try {
    const existingResult = await Result.findOne({ year, sem, branch });
    if (existingResult) {
      return res
        .status(400)
        .json({ success: false, message: "Result already exists" });
    }
    const newResult = new Result({
      createdBy,
      exam,
      year,
      sem,
      branch,
      date,
      subjects,
    });
    await newResult.save();
    return res.json({ success: true, message: "Result added successfully" });
  } catch (error) {
    console.error(error.message);
    if (error.code === 11000 || error.code === 11001) {
      return res.status(400).json({
        success: false,
        message: "Duplicate key error. Result already exists.",
      });
    }
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
});

//get-all-results
router.post("/get-all-results", async (req, res) => {
  try {
    const { exam, year, sem, branch } = req.body;
    const searchQuery = {};
    if (exam) searchQuery.exam = exam;
    if (year) searchQuery.year = year;
    if (sem) searchQuery.sem = sem;
    if (branch) searchQuery.branch = branch;
    const results = await Result.find(searchQuery);
    res.status(200).send({
      message: "Results Fetched Successfully",
      success: true,
      data: results,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      success: false,
    });
  }
});

// delete result
router.post("/delete-result/:_id", authMiddleware, async (req, res) => {
  try {
    const result = await Result.findOneAndDelete({ _id: req.params._id });
    if (!result) {
      return res.status(404).send({
        message: "Result not found",
        success: false,
      });
    }
    res.status(200).send({
      message: "Result deleted successfully",
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Error deleting result:", error);
    res.status(500).send({
      message: error.message,
      success: false,
    });
  }
});

// get results by id
router.post("/get-result/:resultId", async (req, res) => {
  try {
    const result = await Result.findById(req.params.resultId);
    res.status(200).send({
      message: "Result Fetched Successfully",
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      success: false,
    });
  }
});

//add student result
router.post("/save-student-result", authMiddleware, async (req, res) => {
  try {
    const student = await Student.findById(req.body.studentId);
    if (!student) {
      return res.status(200).send({
        message: "Student not found",
        success: false,
      });
    }
    let newResults = student.results;
    const existingResults = student.results;
    const resultExists = existingResults.find(
      (result) => result.resultId === req.body.resultId
    );
    if (resultExists) {
      newResults = existingResults.map((result) => {
        if (result.resultId === req.body.resultId) {
          return {
            ...result,
            obtainedMarks: req.body.obtainedMarks,
            verdict: req.body.verdict,
          };
        }
        return result;
      });
    } else {
      newResults = [...existingResults, req.body];
    }

    const updatedStudent = await Student.findByIdAndUpdate(
      req.body.studentId,
      {
        results: newResults,
      },
      { new: true }
    );
    res.status(200).send({
      message: "Result Saved Successfully",
      success: true,
      data: updatedStudent,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      success: false,
    });
  }
});

//get student result
router.post("/get-student-result", async (req, res) => {
  try {
    const student = await Student.findOne({
      roll: req.body.roll,
    });
    if (!student) {
      return res.status(404).json({
        message: "Student Not Found",
        success: false,
      });
    }

    const resultExists = student.results.find(
      (result) => result.resultId === req.body.resultId
    );
    if (!resultExists) {
      return res.status(404).json({
        message: "Result not Found",
        success: false,
      });
    }

    res.status(200).json({
      message: "Result Fetched Successfully",
      success: true,
      data: {
        ...resultExists,
        studentId: student._id,
        name: student.name,
        branch: student.branch,
        year: student.year,
        sem: student.sem,
        email: student.email,
        phone: student.phone,
        roll: student.roll,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
});

module.exports = router;
