// define router object
const router = require("express").Router(),
    errorController = require("../controllers/errorController");

// error routes
router.use(errorController.pageNotFoundError);
router.use(errorController.internalServerError);

module.exports = router;