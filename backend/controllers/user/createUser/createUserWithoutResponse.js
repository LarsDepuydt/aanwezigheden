const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const HttpError = require("../../../models/http-error");
const User = require("../../../models/user");
const Event = require("../../../models/event");
const Vereniging = require("../../../models/vereniging");

const createUserWithoutResponse = async (
  username,
  password,
  geboortejaar,
  admin,
  vid
) => {
  let existingUser;
  try {
    existingUser = await User.findOne({ username: username.toLowerCase() });
  } catch (err) {
    const error = new HttpError(
      "Failed while searching for an existing user",
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
    admin,
    vereniging: vid,
    onbepaald: [],
  });

  let vereniging;
  try {
    vereniging = await Vereniging.findById(vid);
  } catch (err) {
    const error = new HttpError("Failed while searching vereniging", 500);
    return next(error);
  }

  if (!vereniging) {
    const error = new HttpError(
      "Could not find vereniging for provided id.",
      404
    );
    return next(error);
  }

  let events;
  if (!admin) {
    try {
      events = await Event.find({}, "onbepaald");
    } catch (err) {
      const error = new HttpError("Finding events failed", 500);
      return next(error);
    }
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    if (!admin) {
      for (const event of events) {
        event.onbepaald.push(createdUser._id);
        createdUser.onbepaald.push(event._id);
        await event.save({ session: sess });
      }
    }
    await createdUser.save({ session: sess });
    vereniging.users.push(createdUser);
    await vereniging.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError("Saving events failed", 500);
    return next(error);
  }

  let info = {
    userId: createdUser.id,
    username: createdUser.username,
    admin: false,
  };
  if (admin) {
    info.admin = true;
  }

  let token;
  try {
    token = jwt.sign(info, process.env.JWT_KEY, { expiresIn: "30m" });
  } catch (err) {
    const error = new HttpError("Creating web token failed", 500);
    return next(err);
  }

  return { userId: createdUser.id, token };
};

module.exports = createUserWithoutResponse;
