const checkInput = require("../../util/checkInput");

const HttpError = require("../../models/http-error");
const Event = require("../../models/event");

const createEvent = async (req, res, next) => {
  if (checkInput(req, next) !== 1) {
    return next();
  }

  const { name, date } = req.body;

  const createdEvent = new Event({
    name,
    date,
  });

  try {
    await createdEvent.save();
  } catch (err) {
    const error = new HttpError("Creating event failed", 500);
    return next(error);
  }

  res.status(201).json({ eventId: createdEvent.id });
};

module.exports = createEvent;
