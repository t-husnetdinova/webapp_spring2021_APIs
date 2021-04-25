// the glue that keeps all the routes together
// defining how we use each of the routing objects

//require routing files
const router = require("express").Router(),
userRoutes = require("./userRoutes"),
subscriberRoutes = require("./subscriberRoutes"),
courseRoutes = require("./courseRoutes"),
homeRoutes = require("./homeRoutes"),
errorRoutes = require("./errorRoutes"),
apiRoutes = require("./apiRoutes");

// define namespaces for routes
router.use("/users", userRoutes);
router.use("/subscribers", subscriberRoutes);
router.use("/courses", courseRoutes);
router.use("/api", apiRoutes);
router.use("/", homeRoutes);
router.use("/", errorRoutes);

module.exports = router;