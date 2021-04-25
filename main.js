const { authenticate } = require("./models/user");

const express = require("express"), 
    app = express(),
    router = require("./routes/index"),
    layouts = require("express-ejs-layouts"), 
    mongoose = require("mongoose"),
    methodOverride = require("method-override"),
    passport = require("passport"),
    cookieParser = require("cookie-parser"),
    expressSession = require("express-session"),
    expressValidator = require("express-validator"),
    connectFlash = require("connect-flash"),
    User = require("./models/user");

mongoose.connect(
    "mongodb://localhost:27017/confetti_cuisine", 
{ useNewUrlParser: true },
{ useUnifiedTopology: true }
);

mongoose.set("useCreateIndex", true);

app.set("view engine", "ejs");
app.set("port", process.env.PORT || 3000);
app.use(
    express.urlencoded({
        extended: false
    })
);

router.use(methodOverride("_method", {
    methods: ["POST", "GET", ]
}));

router.use(layouts);
router.use(express.static("public"));
router.use(expressValidator());
router.use(express.json());

router.use(cookieParser("my_passcode"));
router.use(expressSession({
    secret: "my_passcode",
    cookie: {
        maxAge: 360000
    },
    resave: false,
    saveUninitialized: false
}));

router.use(connectFlash());

router.use(passport.initialize());
router.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

router.use((req, res, next) => {
    res.locals.loggedIn = req.isAuthenticated();
    res.locals.currentUser = req.user;
    res.locals.flashMessages = req.flash();
    next();
});

// keep this!
app.use("/", router);

app.listen(app.get("port"), () => {
    console.log(`Server is running on port: ${app.get("port")}`)
});