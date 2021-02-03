const express = require("express");
const { check } = require("express-validator");

const createUser = require("../controllers/user/createUser");
const loginUser = require("../controllers/user/loginUser");

const router = express.Router();

router.post(
  "/signup",
  [
    check("username").notEmpty().trim().escape().isString(),
    check("password").notEmpty().isString().isLength({ min: 6 }),
    check("geboortejaar").isNumeric().isLength({ min: 4, max: 4 }),
    check("roleLeiding").notEmpty().isBoolean(),
  ],
  createUser
);

router.patch(
  "/login",
  [
    check("username").notEmpty().trim().escape().isString(),
    check("password").notEmpty().isString().isLength({ min: 6 }),
  ],
  loginUser
);

module.exports = router;
