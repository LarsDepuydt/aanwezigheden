const express = require("express");
const { check } = require("express-validator");

const createVereniging = require("../controllers/vereniging/createVereniging");

const router = express.Router();

router.post(
  "/",
  [check("name").notEmpty().trim().escape().isString()],
  createVereniging
);

module.exports = router;
