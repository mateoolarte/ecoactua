const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const api = require("./routes");

app.use(express.static(path.join(__dirname, "../client/build")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/api", api);

module.exports = app;
