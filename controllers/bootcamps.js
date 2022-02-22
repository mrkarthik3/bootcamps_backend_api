const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Bootcamp = require("../models/Bootcamp");

// @desc   Get all bootcamps
// @route  GET /api/v1/bootcamps/
// @access Public
exports.getBootcamps = asyncHandler(async (req, res, next) => {
  const bootcamps = await Bootcamp.find(); // gets all bootcamps
  res.status(200).json({ success: true, count: bootcamps.length, data: bootcamps });
});

// @desc   Get Single bootcamps
// @route  GET /api/v1/bootcamps/:id
// @access Public
exports.getBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id); // get 'id' from URL
  if (!bootcamp) {
    // bootcamp = null when ID is properly formatted and is not found in DB
    return next(new ErrorResponse(`Resource NOT Found with id of ${req.params.id}`, 404));
  }
  res.status(200).json({ success: true, data: bootcamp });
});

// @desc   Create new bootcamps
// @route  POST /api/v1/bootcamps/:id
// @access Private (must be logged in / send token)
exports.createBootcamp = asyncHandler(async (req, res, next) => {
  // all data received via req.body is put in DB
  // any field not in our model is ignored and not put in DB

  const bootcamp = await Bootcamp.create(req.body);
  res.status(201).json({ success: true, data: bootcamp });
});

// @desc   Update bootcamp
// @route  PUT /api/v1/bootcamps/:id
// @access Private (must be logged in / send token)
exports.updateBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!bootcamp) {
    // bootcamp = null when ID is properly formatted and is not found in DB
    return next(new ErrorResponse(`Resource NOT Found with id of ${req.params.id}`, 404));
  }
  res.status(200).json({ success: true, data: bootcamp });
});

// @desc   Delete bootcamp
// @route  DELETE /api/v1/bootcamps/:id
// @access Private (must be logged in / send token)
exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);
  if (!bootcamp) {
    // bootcamp = null when ID is properly formatted and is not found in DB
    return next(new ErrorResponse(`Resource NOT Found with id of ${req.params.id}`, 404));
  }
  res.status(200).json({ success: true, data: "delete successful" });
});
