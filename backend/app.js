const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

// protection packages
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const hpp = require("hpp");
const csrf = require("csurf");

const HttpError = require("./models/http-error");

const userRoutes = require("./routes/user-routes");
const eventRoutes = require("./routes/event-routes");
const checkAuth = require("./middleware/checkAuth");

// #################################
// start code
// #################################
const csrfProtection = csrf({ cookie: true });
const parseForm = bodyParser.urlencoded({ extended: false });

const app = express();

// sets security headers
app.use(helmet());

// protect from database injection
app.use(mongoSanitize());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

  next();
});

// parse the data
app.use(bodyParser.json());

// protect against parameter pollution attack
app.use(hpp());

// parse cookie for csurf
app.use(cookieParser());

// get a valid csrf token
app.get("/form", csrfProtection, (req, res) => {
  // pass the csrfToken to the view
  res.send({ csrfToken: req.csrfToken() });
});

// #################################################################
// routes
// #################################################################

app.use("/api/users", /*parseForm, csrfProtection,*/ userRoutes);

app.use(checkAuth);
app.use("/api/event", eventRoutes);

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }

  res
    .status(error.code || 500)
    .json({ message: error.message || "An unkown error occurred!" });
});

mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    app.listen(5000);
  })
  .catch((err) => {
    console.log(err);
  });
