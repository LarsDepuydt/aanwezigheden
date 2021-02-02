const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const checkInput = require("../util/checkInput");

const User = require("../models/user");
const HttpError = require("../models/http-error");

const login = async (req, res, next) => {
  if (checkInput(req, next) !== 1) {
    return next();
  }

  const { username, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ username: username.toLowerCase() });
  } catch (err) {
    const error = new HttpError(
      "Something went wrong while searching for user",
      500
    );
    return next(err);
  }

  if (!existingUser) {
    const error = new HttpError(
      "Invalid credentials, could not log you in",
      403
    );
    return next(error);
  }

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    const error = new HttpError("Password encryption failed", 500);
    return next(error);
  }

  if (!isValidPassword) {
    const error = new HttpError(
      "Invalid credentials, could not log you in",
      403
    );
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      { userId: existingUser.id, username: existingUser.username },
      process.env.JWT_KEY,
      { expiresIn: "15m" }
    );
  } catch (err) {
    const error = new HttpError("Creating web token failed", 500);
    return next(error);
  }

  res.status(200).json({ userId: existingUser.id, token });
};

module.exports = login;
