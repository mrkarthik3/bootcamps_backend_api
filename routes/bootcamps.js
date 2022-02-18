const express = require("express");
const {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
} = require("../controllers/bootcamps.js");
const router = express.Router();

// '/' is equal to '/api/v1/bootcamps'

// GET request to '/' is handled by getBootCamps controller method
// POST request to '/' is handled by createBootcamp controller method
router.route("/").get(getBootcamps).post(createBootcamp);

// GET request to '/:id' is handled by getBootcamp controller method
// PUT request to '/:id' is handled by updateBootcamp controller method
// DELETE request to '/:id' is handled by deleteBootcamp contrller method
router.route("/:id").get(getBootcamp).put(updateBootcamp).delete(deleteBootcamp);

module.exports = router;
