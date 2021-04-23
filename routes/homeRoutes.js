// define router object
const router = require("express").Router(),
    homeController = require("../controllers/homeController");

// home route
router.get("/", homeController.index);

module.exports = router;