const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const report = new Schema({
  address: String,
  description: String,
  pointlat: String,
  pointlong: String,
  state: { type: String, default: "Pendiente" },
  type: String,
  dateCreation: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Report", report);
