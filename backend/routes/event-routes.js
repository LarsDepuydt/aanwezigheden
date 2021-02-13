const express = require("express");
const { check } = require("express-validator");

const createEvent = require("../controllers/event/createEvent");
const getEvents = require("../controllers/event/getEvents");
const updateEvent = require("../controllers/event/updateEvent");
const deleteEvent = require("../controllers/event/deleteEvent");

const router = express.Router();

router.post(
  "/:vid",
  [
    check("name").notEmpty().trim().escape().isString(),
    check("date").notEmpty().isISO8601(),
  ],
  createEvent
);

router.get("/:vid", getEvents);

router.patch(
  "/:vid/:id",
  [
    check("name").optional().trim().escape().isString(),
    check("date").optional().isISO8601(),
  ],
  updateEvent
);

router.delete("/:vid/:id", deleteEvent);

module.exports = router;
