const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

const session = require("express-session");
const MongoStore = require("connect-mongo")(session);

const urlDB = process.env.MONGODB_URI || "mongodb://localhost/ecoactua";
const app = express();
const db = mongoose.connect(urlDB);

const Report = require("./models/report");
const User = require("./models/user");

app.use(express.static(path.join(__dirname, "../client/build")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//initialize session
app.use(
  session({
    secret: "foo",
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    resave: true
  })
);

//initialize reqs for passport
app.use(passport.initialize());
app.use(passport.session());
//End of session initialized

passport.use(
  new LocalStrategy((username, password, done) => {
    return User.findOne({ username: username }, (error, user) => {
      if (error) {
        return done(error);
      }

      if (!user) {
        return done(null, false, { message: "Nombre de usuario incorrecto." });
      }

      if (!user.validPassword(password)) {
        return done(null, false, { message: "Contraseña incorrecta." });
      }

      return done(null, user);
    });
    // findUser(username, (err, user) => {

    //   // Always use hashed passwords and fixed time comparison
    //   bcrypt.compare(password, user.password, (err, isValid) => {
    //     if (err) {
    //       return done(err);
    //     }
    //     if (!isValid) {
    //       return done(null, false);
    //     }
    //     return done(null, user);
    //   });
    // });
  })
);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/api/reportes", (req, res) => {
  Report.find({}, (err, reports) => {
    if (err) {
      res.status(500).send({ err: "We have errors with the reports" });
    } else {
      res.send(reports);
    }
  });
});

app.post("/api/reporte", (req, res) => {
  const report = new Report();
  report.address = req.body.address;
  report.description = req.body.description;
  report.pointlat = req.body.pointlat;
  report.pointlong = req.body.pointlong;
  report.type = req.body.type;

  report.save((err, savedReport) => {
    if (err) {
      res.status(500).send({ err: "No pudo guardar el reporte correctamente" });
    } else {
      User.update(
        {
          _id: req.body.userId
        },
        {
          $addToSet: {
            reports: savedReport._id
          }
        },
        (err, user) => {
          if (err) {
            res.status(500).send({
              err: "No pudo integrar el usuario al reporte correctamente"
            });
          }
        }
      );

      res.send(savedReport);
    }
  });
});

app.put("/api/reporte", (req, res) => {
  Report.update(
    {
      _id: req.body.id
    },
    {
      $set: {
        state: req.body.state
      }
    },
    (err, report) => {
      if (err) {
        res.status(500).send({
          err: "No se actualizo el estado del reporte correctamente"
        });
      }

      return res.send(report);
    }
  );
});

app.delete("/api/reporte", (req, res) => {
  Report.findById(req.query.id, (err, report) => {
    if (err)
      res.status(500).send({ message: `Error al eliminar el reporte ${err}` });

    report.remove(err => {
      if (err) {
        res
          .status(500)
          .send({ message: `Error al eliminar el reporte ${err}` });
      }
      res.status(200).send({ message: `Reporte ha sido eliminado` });
    });
  });

  // Report.remove({ _id: req.body.id }, (error, report) => {
  //   if (error) return res.status(500).send(error);

  //   return res.status(200).send(report);
  // });
});

app.get("/api/usuarios", (req, res) => {
  User.find({})
    .populate("reports")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ err: "We have errors with the users" });
      } else {
        res.send(user);
      }
    });
});

// Create a new user
app.post("/api/signup", (req, res) => {
  const user = new User();
  // Validate if the user exists
  User.findOne(
    {
      username: req.body.username
    },
    function(err, exixtantUser) {
      if (err) return "An error has ocurred";
      if (exixtantUser == null) {
        User.findOne(
          {
            email: req.body.email
          },
          function(err, exixtantEmail) {
            if (err) return "An error has ocurred";
            if (exixtantEmail == null) {
              user.firstName = req.body.firstName;
              user.LastName = req.body.LastName;
              user.email = req.body.email;
              user.username = req.body.username;
              bcrypt.hash(req.body.password, 10, function(err, hash) {
                user.password = hash;
                user.save((err, savedUser) => {
                  if (err) {
                    console.log(user.password);
                    res
                      .status(500)
                      .send({ err: "No pudo crear el usuario correctamente" });
                  } else {
                    res.send({
                      userSave: savedUser,
                      notification: "Se ha creado el usuario correctamente."
                    });
                  }
                });
              });
            } else {
              res.status(409).send("email is already in use");
            }
          }
        );
      } else {
        res.status(409).send("username is already in use");
        return;
      }
    }
  );
});
// Create a new user end

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get("/*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client/build", "index.html"));
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}!`));
