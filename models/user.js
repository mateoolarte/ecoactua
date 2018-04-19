const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.ObjectId;

const user = new Schema({
  firstName: String,
  LastName: String,
  email: String,
  role: { type: String, default: "user" },
  username: { type: String, unique: true },
  password: { type: String, required: true },
  reports: [{ type: ObjectId, ref: "Report" }]
});

module.exports = mongoose.model("User", user);
