const HttpError = require("../../models/http-error");
const Event = require("../../models/user");

const getOneEvent = async (req, res, next) => {
  const { id } = req.params;

  let event;
  try {
    event = await Event.findById(id, "name date");
  } catch (err) {
    const error = new HttpError("Fetching event failed", 500);
    return next(err);
  }

  res.status(200).json({ event });
};

module.exports = getOneEvent;
