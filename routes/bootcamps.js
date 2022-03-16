const express = require("express");
const {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  getBootcampsInRadius,
  bootcampPhotoUpload
} = require("../controllers/bootcamps.js");

// Include other resource routers
const courseRouter = require('./courses')

const router = express.Router();

// Re-route into other resource routers
// When this route is hit, it will redirect & point to '/' in 'courses' router (coming from line 12)
router.use('/:bootcampId/courses', courseRouter);

// '/' is equal to '/api/v1/bootcamps'

router.route("/radius/:zipcode/:distance").get(getBootcampsInRadius);

// GET request to '/' is handled by getBootCamps controller method
// POST request to '/' is handled by createBootcamp controller method
router.route("/").get(getBootcamps).post(createBootcamp);

// GET request to '/:id' is handled by getBootcamp controller method
// PUT request to '/:id' is handled by updateBootcamp controller method
// DELETE request to '/:id' is handled by deleteBootcamp contrller method
router.route("/:id").get(getBootcamp).put(updateBootcamp).delete(deleteBootcamp);

// PUT request to update photo of a bootcamp
router.route("/:id/photo").put(bootcampPhotoUpload)

module.exports = router;
