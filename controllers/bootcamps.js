const Bootcamp = require("../models/Bootcamp");

// @desc   Get all bootcamps
// @route  GET /api/v1/bootcamps/
// @access Public
exports.getBootcamps = async (req, res, next) => {
  try {
    const bootcamps = await Bootcamp.find(); // gets all bootcamps
    res.status(200).json({ success: true, count: bootcamps.length, data: bootcamps });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

// @desc   Get Single bootcamps
// @route  GET /api/v1/bootcamps/:id
// @access Public
exports.getBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findById(req.params.id); // get 'id' from URL
    if (!bootcamp) {
      // bootcamp = null when ID is properly formatted and is not found
      return res.status(400).json({ success: false });
    }
    res.status(200).json({ success: true, data: bootcamp });
  } catch (err) {
    // when ID is not properly formatted, promise fails... this runs
    res.status(404).json({ success: false });
  }
};

// @desc   Create new bootcamps
// @route  POST /api/v1/bootcamps/:id
// @access Private (must be logged in / send token)
exports.createBootcamp = async (req, res, next) => {
  // all data received via req.body is put in DB
  // any field not in our model is ignored and not put in DB
  try {
    const bootcamp = await Bootcamp.create(req.body);
    res.status(201).json({ success: true, data: bootcamp });
  } catch (err) {
    res.status(401).json({ success: false });
  }
};

// @desc   Update bootcamp
// @route  PUT /api/v1/bootcamps/:id
// @access Private (must be logged in / send token)
exports.updateBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!bootcamp) {
      return res.status(400).json({ success: false });
    }

    res.status(200).json({ success: true, data: bootcamp });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

// @desc   Delete bootcamp
// @route  DELETE /api/v1/bootcamps/:id
// @access Private (must be logged in / send token)
exports.deleteBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);

    if (!bootcamp) {
      return res.status(400).json({ success: false });
    }

    res.status(200).json({ success: true, data: "delete successful" });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};
