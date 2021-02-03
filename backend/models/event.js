const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const event = new Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  aanwezig: [{ type: mongoose.Types.ObjectId, ref: "User" }],
  afwezig: [{ type: mongoose.Types.ObjectId, ref: "User" }],
  onbepaald: [{ type: mongoose.Types.ObjectId, ref: "User" }],
});

event.plugin(uniqueValidator, { message: "Error in event schema" });

module.exports = mongoose.model("Event", event);
