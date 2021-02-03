const HttpError = require("../../models/http-error");
const Event = require("../../models/event");

const deleteEvent = async (req, res, next) => {
  const { id } = req.params;

  try {
    await Event.findByIdAndDelete(id);
  } catch (err) {
    const error = new HttpError("Deleting event failed", 500);
    return next(error);
  }

  res.status(200).json({ message: "Event deleted!" });
};

module.exports = deleteEvent;
