const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const api = require("./routes");

app.use(express.static(path.join(__dirname, "../client/build")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/api", api);

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
api.get("/*", (req, res) => {
  return res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

module.exports = app;
