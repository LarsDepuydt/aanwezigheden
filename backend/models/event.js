const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const event = new Schema({
  name: { type: String },
  date: { type: Date },
});

event.plugin(uniqueValidator, { message: "Error in event schema" });

module.exports = mongoose.model("Event", event);
