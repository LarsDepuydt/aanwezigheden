const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

// protection packages
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const hpp = require("hpp");
const csrf = require("csurf");
const cors = require("cors");

const HttpError = require("./models/http-error");

const userRoutes = require("./routes/user-routes");
const verenigingRoutes = require("./routes/vereniging-routes");
const eventRoutes = require("./routes/event-routes");
const checkAuth = require("./middleware/checkAuth");

// #################################
// start code
// #################################
//const csrfProtection = csrf({ cookie: true });
//const parseForm = bodyParser.urlencoded({ extended: false });

const app = express();

// sets security headers
app.use(helmet());

// enables cors
const whitelist = process.env.FRONTEND_URL.split(",");
// const corsOptions = {
//   origin: (origin, callback) => {
//     console.log("Received origin:", origin); // Log the origin of the request
//     if (whitelist.indexOf(origin) !== -1 || !origin) {
//       // Allow empty origin (for local testing)
//       callback(null, true); // Allow the request
//     } else {
//       console.log("Not allowed by CORS for origin:", origin);
//       callback(new Error("Not allowed by CORS")); // Deny the request
//     }
//   },
//   methods: "GET, POST, PATCH, DELETE, OPTIONS", // Ensure OPTIONS is included
//   allowedHeaders:
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization",
// };
const corsOptions = {
  origin: "*", // Allow all origins for now to test
  methods: "GET, POST, PATCH, DELETE, OPTIONS",
  allowedHeaders: "Content-Type, Accept, Authorization",
};
app.use(cors(corsOptions));

app.options("*", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // Allow all origins for now
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS",
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Accept, Authorization",
  );
  res.status(204).send(); // No content response
});

// parse the data
app.use(bodyParser.json());

// protect from database injection
app.use(mongoSanitize());

// protect against parameter pollution attack
app.use(hpp());

// parse cookie for csurf
app.use(cookieParser());

// get a valid csrf token
// app.get("/form", csrfProtection, (req, res) => {
//   // pass the csrfToken to the view
//   res.send({ csrfToken: req.csrfToken() });
// });

// #################################################################
// routes
// #################################################################

app.use("/api/users", /*parseForm, csrfProtection,*/ userRoutes);
app.use("/api/vereniging", verenigingRoutes);

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

const dbURI = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?retryWrites=true&w=majority`;
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    app.listen(process.env.BACKEND_PORT, () => {
      console.log(whitelist);
      console.log(`Server running on port ${process.env.BACKEND_PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
