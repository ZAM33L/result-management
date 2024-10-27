const express = require("express");
const router = express.Router();
const Student = require("../models/studentModel");
const authMiddleware = require("../middleware/authMiddleware");

//add new srudent
router.post("/add-student", authMiddleware, async (req, res) => {
  try {
    const studentExist = await Student.findOne({
      roll: req.body.roll,
    });
    if (studentExist) {
      return res.status(200).send({
        message: "Student Alreadt Exist",
        success: false,
      });
    }
    const newStudent = new Student(req.body);
    await newStudent.save();
    res.status(200).send({
      message: "Student Added Successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      success: false,
    });
  }
});

router.post("/get-all-students", authMiddleware, async (req, res) => {
  try {
    const { branch, sem, year, roll } = req.body;
    const filter = {};
    if (branch) filter.branch = branch;
    if (sem) filter.sem = sem;
    if (year) filter.year = year;
    if (roll) filter.roll = roll;
    let students = await Student.find(filter);
    res.status(200).send({
      message: "Students Fetched Successfully",
      success: true,
      data: students,
    });
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).send({
      message: error.message,
      success: false,
    });
  }
});

//by class
router.post("/get-all-students-by-filter", async (req, res) => {
  try {
    const { sem, year, branch } = req.body;
    const students = await Student.find({ sem, year, branch });
    res.json({
      success: true,
      data: students,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

//get student by roll number
router.post("/get-student/:roll", authMiddleware, async (req, res) => {
  try {
    const student = await Student.findOne({
      roll: req.params.roll,
    });
    if (!student) {
      return res.send({
        message: "Student not Found",
        success: false,
      });
    }
    res.status(200).send({
      message: "Student Fetched Successfully",
      success: true,
      data: student,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      success: false,
    });
  }
});

//upadte student
router.post("/update-student/:roll", authMiddleware, async (req, res) => {
  try {
    const student = await Student.findOneAndUpdate(
      { roll: req.params.roll },
      req.body,
      { new: true }
    );
    if (!student) {
      return res.send({
        message: "Student not found",
        success: false,
      });
    }
    res.status(200).send({
      message: "student updated successfully",
      success: true,
      data: student,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      success: false,
    });
  }
});

//delete student
router.post("/delete-student/:roll", authMiddleware, async (req, res) => {
  try {
    const student = await Student.findOneAndDelete({ roll: req.params.roll });
    if (!student) {
      return res.send({
        message: "Student not found",
        success: false,
      });
    }
    res.status(200).send({
      message: "student deleted successfully",
      success: true,
      data: student,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      success: false,
    });
  }
});

module.exports = router;
