const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const checkInput = require("../../util/checkInput");

const HttpError = require("../../models/http-error");
const User = require("../../models/user");

const createUser = async (req, res, next) => {
  if (checkInput(req, next) !== 1) {
    return next();
  }
  const { username, password, geboortejaar } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ username: username.toLowerCase() });
  } catch (err) {
    const error = new HttpError(
      "Failed to while searching for an existing user",
      500
    );
    return next(error);
  }
  if (existingUser) {
    const error = new HttpError("User alreading exists", 422);
    return next(error);
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    const error = new HttpError(
      "Could not create user, hashing password failed",
      500
    );
    return next(error);
  }
  const createdUser = new User({
    username: username.toLowerCase(),
    password: hashedPassword,
    geboortejaar,
  });
  try {
    await createdUser.save();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not create user",
      500
    );
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      { userId: createdUser.id, username: createdUser.username },
      process.env.JWT_KEY,
      { expiresIn: "15m" }
    );
  } catch (err) {
    const error = new HttpError("Creating web token failed", 500);
    return next(err);
  }

  res.status(201).json({ userId: createdUser.id, token });
};

module.exports = createUser;
