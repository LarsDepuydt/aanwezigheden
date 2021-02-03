const mongoose = require("mongoose");

const checkInput = require("../../util/checkInput");

const HttpError = require("../../models/http-error");
const Event = require("../../models/event");
const User = require("../../models/user");

const createEvent = async (req, res, next) => {
  if (checkInput(req, next) !== 1) {
    return next();
  }

  const { name, date } = req.body;

  const createdEvent = new Event({
    name,
    date,
    onbepaald: [],
  });

  let users;
  try {
    users = await User.find({}, "onbepaald");
  } catch (err) {
    const error = new HttpError("Fetching all current users failed", 500);
    return next(error);
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    for (const user of users) {
      user.onbepaald.push(createdEvent._id);
      createdEvent.onbepaald.push(user._id);
      await user.save({ session: sess });
    }
    await createdEvent.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError("Creating event failed", 500);
    return next(err);
  }

  res.status(201).json({ eventId: createdEvent.id });
};

module.exports = createEvent;
