const ErrorResponse = require("../utils/errorResponse");

const errorHandler = (err, req, res, next) => {
  let error = { ...err }; // copy enumerable properties of err object to error
  error.message = err.message; // this is needed because 'message' is not enumerable

  // Log to console for dev
  console.log(err.stack.red.bold);

  console.log("*******************************");
  console.log(JSON.parse(JSON.stringify(err)));
  console.log("*******************************");
  // console.log(err);
  console.log("*******************************");
  console.log(`Name of this error: ${err.name}`);
  console.log("*******************************");

  //   console.log(err.name); // gives name of error

  // Mongoose Error - Bad ObjectID
  if (err.name === "CastError") {
    const message = `Resource not found with id ${err.value}`;
    error = new ErrorResponse(message, 404);
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    const message = `Duplicate field value entered`;
    error = new ErrorResponse(message, 400); // 400 = bad request
  }

  // Mongoose validation error
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ErrorResponse(message.join(" & "), 400);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "Server error",
  });
};

module.exports = errorHandler;
