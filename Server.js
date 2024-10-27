const express = require("express");
const app = express();
require("dotenv").config();
const dbConfig = require("./config/dbconfig");
app.use(express.json());

const facultyRoute = require("./routes/facultyRoute");
const studentRoute = require("./routes/studentRoute");
const resultRoute = require("./routes/resultRoute");
const contactRoute =require("./routes/contactRoute")

app.use("/api/faculty/", facultyRoute);
app.use("/api/student/", studentRoute);
app.use("/api/results/", resultRoute);
app.use("/api/", contactRoute)
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Malik's Server Listening on ${port}`));
