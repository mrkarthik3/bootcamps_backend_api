const express = require("express");
const {
    getCourse,
    getCourses,
    addCourse,
    updateCourse,
    deleteCourse
} = require("../controllers/courses.js");
const router = express.Router({ mergeParams: true });

// '/' is equal to '/api/v1/courses'
router.route("/").get(getCourses).post(addCourse);

router.route("/:id").get(getCourse).put(updateCourse).delete(deleteCourse);

module.exports = router;