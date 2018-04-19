const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const report = new Schema({
  address: String,
  description: String,
  pointlat: String,
  pointlong: String,
  state: String,
  type: String,
  user: String
});

module.exports = mongoose.model("Report", report);
