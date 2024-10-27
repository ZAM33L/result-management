const express = require("express");
const router = express.Router();
const Contact = require("../models/contactModel");
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

router.post("/contact", async (req, res) => {
  try {
    const { name, email, message, phone } = req.body;
    const newContact = new Contact({ name, email, message, phone });
    await newContact.save();
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: email,
      subject: "Thank you for contacting us! Abdul Malik : ) website ready ..",
      text: `Hi ${name},\n\n this is our website sir Thank you for reaching out. We have received your message and will get back to you as soon as possible.\n\nSincerely,\nMSAJCE`,
    });
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: "maliksvg2004@gmail.com",
      subject: "New Contact Submission",
      text: `Name: ${name}\nEmail: ${email}\nMessage:\n${message}`,
    });

    res.json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error sending email" });
  }
});

module.exports = router;
