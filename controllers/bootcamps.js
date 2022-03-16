const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const getocoder = require("../utils/geocoder");
const Bootcamp = require("../models/Bootcamp");
const { select } = require("async");

// @desc   Get all bootcamps
// @route  GET /api/v1/bootcamps/
// @access Public
exports.getBootcamps = asyncHandler(async (req, res, next) => {
  let query;

  // copy req.query
  const reqQuery = { ...req.query };

  // Fields to exclude. These fields are not to be matched...
  const removeFields = ['select', 'sort', 'page', 'limit'];

  // Loop over removeFields and delete those fields from reqQuery
  removeFields.forEach(param => delete reqQuery[param]);

  // Create query string
  let queryStr = JSON.stringify(reqQuery);

  // Create operators ($gt, $gte, etc)
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, (match) => `$${match}`);

  // Finding resource
  query = Bootcamp.find(JSON.parse(queryStr)).populate('courses');

  // Select "specific" Fields (when trying to select a few fields... 'select' will be present on req.query)
  if (req.query.select) {
    const fields = req.query.select.split(",").join(" ");
    query = query.select(fields);
  }

  // sort
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    query = query.sort(sortBy);
  } else {
    // default sort
    query = query.sort('-createdAt'); // negative means descending order
  }

  // Pagination. parseInt(number, 10) => parse 'number' as base 10 number
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 1;
  const startIndex = (page - 1) * limit;
  // If page = 1 then startIndex = 0    when limit = 10
  // If page = 2 then startIndex = 10   when limit = 10
  // If page = 3 then startIndex = 20   when limit = 10
  const endIndex = page * limit;
  const total = await Bootcamp.countDocuments();

  // .limit() and .skip() are mongoose middleware functions that are to be
  // applied on the query.
  query = query.skip(startIndex).limit(limit);

  // Executing query.
  const bootcamps = await query; // gets all matching bootcamps

  // Pagination result
  const pagination = {};

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit
    }
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit
    }
  }

  res.status(200).json({ success: true, count: bootcamps.length, pagination, data: bootcamps });
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
  // const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);
  const bootcamp = await Bootcamp.findById(req.params.id);
  if (!bootcamp) {
    // bootcamp = null when ID is properly formatted and is not found in DB
    return next(new ErrorResponse(`Resource NOT Found with id of ${req.params.id}`, 404));
  }
  bootcamp.remove();
  res.status(200).json({ success: true, data: "delete successful" });
});

// @desc   Get bootcamps within a radius (miles)
// @route  GET /api/v1/bootcamps/radius/:zipcode/:distance
// @access Private (must be logged in / send token)
exports.getBootcampsInRadius = asyncHandler(async (req, res, next) => {
  const { zipcode, distance } = req.params;

  // use zipcode and get lat/lng from geocoder
  const loc = await getocoder.geocode(zipcode);
  const lat = loc[0].latitude;
  const lng = loc[0].longitude;

  // calculate radius using radians
  // Divide distance by radius of earth
  // radius of earth = 3963 mi or  6378 km

  const radius = distance / 3963;
  const bootcamps = await Bootcamp.find({
    location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } },
  });

  res.status(200).json({
    success: true,
    count: bootcamps.length,
    data: bootcamps,
  });
});


