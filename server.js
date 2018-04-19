const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const db = mongoose.connect("mongodb://localhost/ecoactua");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



app.listen(3000, () => console.log("Listening on port 3000!"));
