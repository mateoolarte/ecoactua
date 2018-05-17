const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.ObjectId;

const User = new Schema({
  email: { type: String, unique: true, lowercase: true },
  username: { type: String, unique: true },
  password: { type: String },
  role: { type: String, default: "user" },
  firstName: String,
  lastName: String,
  reports: [{ type: ObjectId, ref: "Report" }]
});

module.exports = mongoose.model("User", User);
