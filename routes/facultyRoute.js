const express = require("express");
const router = express.Router();
const Faculty = require("../models/facultyModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middleware/authMiddleware");
const nodemailer = require("nodemailer");

//new register
router.post("/register", async (req, res) => {
  try {
    const facultyExist = await Faculty.findOne({
      facultyID: req.body.facultyID,
    });
    if (facultyExist) {
      return res.status(200).send({
        message: "Faculty already Exist",
        success: false,
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;
    const newFaculty = new Faculty(req.body);
    await newFaculty.save();
    res.status(200).send({
      message: "Registered Successfully,Please Wait for HOD Approval",
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      success: false,
    });
  }
});

// login
router.post("/login", async (req, res) => {
  try {
    const faculty = await Faculty.findOne({
      facultyID: req.body.facultyID,
    });
    if (!faculty) {
      return res.status(200).send({
        message: "Faculty Not found",
        success: false,
      });
    }
    const isMatch = await bcrypt.compare(req.body.password, faculty.password);
    if (!isMatch) {
      return res.status(200).send({
        message: "Invalid Password",
        success: false,
      });
    }
    if (faculty.isApproved === false) {
      return res.status(200).send({
        message: "Please wait for admin approval",
        success: false,
      });
    }
    const token = jwt.sign({ facultyID: faculty._id }, process.env.TOKEN, {
      expiresIn: "1d",
    });
    res.status(200).send({
      message: "Login Successfull",
      success: true,
      data: token,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      success: false,
    });
  }
});

//get faculty by id
router.post("/get-faculty-by-id", authMiddleware, async (req, res) => {
  try {
    const faculty = await Faculty.findOne({
      _id: req.body.facultyID,
    });
    if (!faculty) {
      return res.status(200).send({
        message: "Faculty Not Found",
        success: false,
      });
    }
    faculty.password = undefined;
    res.status(200).send({
      message: "Faculty Found",
      success: true,
      data: faculty,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      success: false,
    });
  }
});

//request approval
router.post("/request-approval", async (req, res) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: "j.abdmalik20@gmail.com",
      subject: "Faculty Approval Request",
      text: `Faculty ID: ${req.body.fID}\nMessage: ${req.body.message}`,
    });
    res.json({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error sending email" });
  }
});

module.exports = router;
