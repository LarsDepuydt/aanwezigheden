const checkInput = require("../../util/checkInput");

const HttpError = require("../../models/http-error");
const User = require("../../models/user");

const updateAanwezigheid = async (req, res, next) => {
  if (checkInput(req, next) !== 1) {
    return next();
  }

  const { aanwezig, afwezig, onbepaald } = req.body;

  let user;
  try {
    user = await User.findById(req.userData.userId);
  } catch (err) {
    const error = new HttpError("No user with current id found", 500);
    return next(error);
  }

  aanwezig &&
    aanwezig.map((item) => {
      if (user.onbepaald.indexOf(item) !== -1) {
        user.onbepaald.pull(item);
        user.aanwezig.push(item);
      } else if (user.afwezig.indexOf(item) !== -1) {
        user.afwezig.pull(item);
        user.aanwezig.push(item);
      } else {
        user.aanwezig.push(item);
      }
    });

  afwezig &&
    afwezig.map((item) => {
      if (user.onbepaald.indexOf(item) !== -1) {
        user.onbepaald.pull(item);
        user.afwezig.push(item);
      } else if (user.aanwezig.indexOf(item) !== -1) {
        user.aanwezig.pull(item);
        user.afwezig.push(item);
      } else {
        user.afwezig.push(item);
      }
    });

  onbepaald &&
    onbepaald.map((item) => {
      if (user.aanwezig.indexOf(item) !== -1) {
        user.aanwezig.pull(item);
        user.onbepaald.push(item);
      } else if (user.afwezig.indexOf(item) !== -1) {
        user.afwezig.pull(item);
        user.onbepaald.push(item);
      } else {
        user.onbepaald.push(item);
      }
    });

  try {
    await user.save();
  } catch (err) {
    const error = new HttpError("Updating events status failed", 500);
    return next(error);
  }

  res.status(200).json({ user });
};

module.exports = updateAanwezigheid;
