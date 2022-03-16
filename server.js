const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const connectDB = require("./config/db");
const colors = require("colors");
const errorHander = require("./middleware/error");
const fileupload = require("express-fileupload")
const path = require('path')

// Load env variables by specifying path to config.env file
dotenv.config({ path: "./config/config.env" });

// Connect to database
connectDB();

// Router files importing
const bootcamps = require("./routes/bootcamps");
const courses = require("./routes/courses");

// Error Handler Middleware Import
const errorHandler = require("./middleware/error");

const app = express();

// This middleware is needed to read 'body' data from request object (req.body)
// data sent via POST request is in 'body' property of request object.
app.use(express.json());

// External logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// File uploading
app.use(fileupload())

// Set static folder
app.use(express.static(path.join(__dirname, 'public')))

// Mount routers
app.use("/api/v1/bootcamps", bootcamps);
app.use("/api/v1/courses", courses);

// error hander must be used after router is mounted
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`.yellow.bold)
);

// Handle unhandled promise rejections (of Mongoose methods)
// I could have handled a rejected promise using .then().catch() syntax
// As I used async await... I could have use try-catch block to handle promise rejection

// But I am handling rejections at GLOBAL LEVEL like this as I want
// my app to fail (exit with code 1) when there is some error in
// connecting to my MongoDB database.

process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // close server and exit process with code 1 (meaning error)
  server.close(() => process.exit(1));
});
