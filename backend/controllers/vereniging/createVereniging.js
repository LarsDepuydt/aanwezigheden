const checkInput = require("../../util/checkInput");
const createUserWithoutResponse = require("../user/createUser/createUserWithoutResponse");

const HttpError = require("../../models/http-error");
const Vereniging = require("../../models/vereniging");

const createVereniging = async (req, res, next) => {
  if (checkInput(req, next) !== 1) {
    return next();
  }
  const { name, username, password } = req.body;

  let existingVereniging;
  try {
    existingVereniging = await Vereniging.findOne({ name: name.toLowerCase() });
  } catch (err) {
    const error = new HttpError(
      "Failed while searching for an existing vereniging",
      500
    );
    return next(error);
  }
  if (existingVereniging) {
    const error = new HttpError("Vereniging alreading exists", 422);
    return next(error);
  }

  const createdVereniging = new Vereniging({
    name: name,
  });

  try {
    await createdVereniging.save();
  } catch (err) {
    const error = new HttpError("Saving vereniging failed", 500);
    return next(error);
  }

  let newUser;
  try {
    newUser = createUserWithoutResponse(
      username,
      password,
      null,
      true,
      createdVereniging.id
    );
  } catch (err) {
    return next(err);
  }

  res.status(201).json({ id: createdVereniging.id, ...newUser });
};

module.exports = createVereniging;
