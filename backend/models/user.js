const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const user = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  geboortejaar: { type: Number, length: 4 },
  admin: { type: Boolean, default: false },
  vereniging: { type: mongoose.Types.ObjectId, ref: "Vereniging" },
  aanwezig: [{ type: mongoose.Types.ObjectId, ref: "Event", default: [] }],
  afwezig: [{ type: mongoose.Types.ObjectId, ref: "Event", default: [] }],
  onbepaald: [{ type: mongoose.Types.ObjectId, ref: "Event", default: [] }],
});

user.plugin(uniqueValidator, { message: "Error in user schema" });

module.exports = mongoose.model("User", user);
