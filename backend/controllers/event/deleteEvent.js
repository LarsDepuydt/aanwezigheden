const mongoose = require("mongoose");

const HttpError = require("../../models/http-error");
const Event = require("../../models/event");
const User = require("../../models/user");

const deleteEvent = async (req, res, next) => {
  const { id } = req.params;

  let users;
  try {
    users = await User.find({}, "aanwezig afwezig onbepaald");
  } catch (err) {
    const error = new HttpError("Error while searching all users", 500);
    return next(error);
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    if (users) {
      for (const user of users) {
        if (user.onbepaald.indexOf(id) !== -1) {
          user.onbepaald.pull(id);
        } else if (user.afwezig.indexOf(id) !== -1) {
          user.afwezig.pull(id);
        } else if (user.aanwezig.indexOf(id) !== -1) {
          user.aanwezig.pull(id);
        }

        await user.save({ session: sess });
      }
    }
    await Event.findByIdAndDelete(id, { session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError("Deleting event failed", 500);
    return next(err);
  }

  res.status(200).json({ message: "Event deleted!" });
};

module.exports = deleteEvent;
