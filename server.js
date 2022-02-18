const express = require("express");
const dotenv = require("dotenv");

// Load env variables by specifying path to config.env file

dotenv.config({ path: "./config/config.env" });

const app = express();

// handling GET request
app.get("/api/v1/bootcamps", (req, res) => {
  res.status(200).json({ success: true, msg: "Show all bootcamps" });
});

// handling GET request to a specific bootcamp with id = req.params.id
app.get("/api/v1/bootcamps/:id", (req, res) => {
  res.status(200).json({ success: true, msg: `Get bootcamp ${req.params.id}` });
});

// handling POST request
app.post("/api/v1/bootcamps", (req, res) => {
  res.status(200).json({ success: true, msg: "Create new bootcamp" });
});

// handling PUT request to UPDATE a bootcamp with id = req.params.id
app.put("/api/v1/bootcamps/:id", (req, res) => {
  res.status(200).json({ success: true, msg: `Update bootcamp ${req.params.id}` });
});

// handling DELETE request to DELETE a bootcamp with id = req.params.id
app.delete("/api/v1/bootcamps/:id", (req, res) => {
  res.status(200).json({ success: true, msg: `Delete bootcamp ${req.params.id}` });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`));
