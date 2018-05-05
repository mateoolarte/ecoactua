const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
// Const for passport
const passport = require('passport');
const bcrypt = require('bcrypt')
//end for passport
//FOr ussage if sessions
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
//End of use of sessions

const urlDB = process.env.MONGODB_URI || "mongodb://localhost/ecoactua"
const app = express();
const db = mongoose.connect(urlDB);

const Report = require("./models/report");
const User = require("./models/user");

app.use(express.static(path.join(__dirname, "../client/build")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//initialize session
app.use(session({
  secret: 'foo',
  store: new MongoStore({mongooseConnection: mongoose.connection}),
  resave: true
}));

//initialize reqs for passprt
app.use(passport.initialize())
app.use(passport.session())
//End of session initialized

app.get("/api/reportes", (req, res) => {
  Report.find({}, (err, reports) => {
    if (err) {
      res.status(500).send({err: "We have errors with the reports"});
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
  report.state = req.body.state;
  report.type = req.body.type;

  report.save((err, savedReport) => {
    if (err) {
      res.status(500).send({err: "No pudo guardar el reporte correctamente"});
    } else {
      User.update({
        _id: req.body.userId
      }, {
        $addToSet: {
          reports: savedReport._id
        }
      }, (err, user) => {
        if (err) {
          res.status(500).send({err: "No pudo integrar el usuario al reporte correctamente"});
        }
      });

      res.send(savedReport);
    }
  });
});

app.get("/api/usuarios", (req, res) => {
  User.find({}).populate("reports").exec((err, user) => {
    if (err) {
      res.status(500).send({err: "We have errors with the users"});
    } else {
      res.send(user);
    }
  });
});

///Create a new user
app.post("/api/usuario", (req, res) => {
  const user = new User();
  //Validamos Si el usuario ya exite
  // User.findOne({username:req.body.username},function(err,exixtantUser){
  User.findOne({
    username: req.body.username
  }, function(err, exixtantUser) {
    // res.send(exixtantUser)
    if (err)
      return 'An error has ocurred'
    if (exixtantUser == null) {
      User.findOne({
        email: req.body.email
      }, function(err, exixtantEmail) {
        if (err)
          return 'An error has ocurred'
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
                res.status(500).send({err: "No pudo crear el usuario correctamente"});
              } else {
                res.send(savedUser);
              }
            });
          });
        } else {
          res.status(409).send('email is already in use')
        }
      })
    } else {
      res.status(409).send('username is already in use')
      return
    }
  })
  // User.find({username:req.body.username},function(err, foundUser){
  //   res.send('works')
  // })
  // res.send('fin')

});
//End creation

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}!`));
