// define router object
const router = require("express").Router(),
    coursesController = require("../controllers/coursesController");

// api routes
router.get("/courses", coursesController.index, coursesController.filterUserCourses, coursesController.respondJSON);
router.get("/courses/:id/join", coursesController.join, coursesController.respondJSON);
router.get(coursesController.errorJSON);

module.exports = router;