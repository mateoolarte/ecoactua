const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const db = mongoose.connect("mongodb://localhost/ecoactua");

const Report = require("./models/report");
const User = require("./models/user");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/reportes", (req, res) => {
  Report.find({}, (err, reports) => {
    if (err) {
      res.status(500).send({ err: "We have errors with the reports" });
    } else {
      res.send(reports);
    }
  });
});

app.post("/reporte", (req, res) => {
  const report = new Report();
  report.address = req.body.address;
  report.description = req.body.description;
  report.pointlat = req.body.pointlat;
  report.pointlong = req.body.pointlong;
  report.state = req.body.state;
  report.type = req.body.type;

  report.save((err, savedReport) => {
    if (err) {
      res.status(500).send({ err: "No pudo guardar el reporte correctamente" });
    } else {
      User.update({_id: req.body.userId}, {$addToSet: { reports: savedReport._id }}, (err, user) => {
        if (err) {
          res.status(500).send({ err: "No pudo integrar el usuario al reporte correctamente" });
        }
      })

      res.send(savedReport);
    }
  });
});

app.get("/usuarios", (req, res) => {
  User
    .find({})
    .populate("reports")
    .exec((err, user) => {
    if (err) {
      res.status(500).send({ err: "We have errors with the users" });
    } else {
      res.send(user);
    }
  });
});

app.post("/usuario", (req, res) => {
  const user = new User();
  user.firstName = req.body.firstName;
  user.LastName = req.body.LastName;
  user.email = req.body.email;
  user.username = req.body.username;
  user.password = req.body.password;

  user.save((err, savedUser) => {
    if (err) {
      res.status(500).send({ err: "No pudo crear el usuario correctamente" });
    } else {
      res.send(savedUser);
    }
  });
});

app.listen(3001, () => console.log("Listening on port 3001!"));
