const checkInput = require("../../util/checkInput");
const createUserWithoutResponse = require("./createUser/createUserWithoutResponse");

const createUser = (req, res, next) => {
  if (checkInput(req, next) !== 1) {
    return next();
  }
  const { username, password, geboortejaar, admin } = req.body;
  const { vid } = req.params;

  let response;
  try {
    response = createUserWithoutResponse(
      username,
      password,
      geboortejaar,
      admin,
      vid
    );
  } catch (err) {
    return next(err);
  }

  res.status(201).json(response);
};

module.exports = createUser;
