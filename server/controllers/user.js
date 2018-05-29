const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config");

function signUp(req, res) {
  const user = new User();

  User.findOne({ username: req.body.username }, (err, usernameRegistered) => {
    if (err) return "Ha ocurrido un error buscando el nombre de usuario.";

    if (usernameRegistered === null) {
      User.findOne({ email: req.body.email }, (err, emailRegistered) => {
        if (err) return "Ha ocurrido un error buscando el correo electrónico";

        if (emailRegistered === null) {
          const hashedPassword = bcrypt.hashSync(req.body.password, 10);

          user.firstName = req.body.firstName;
          user.lastName = req.body.lastName;
          user.email = req.body.email;
          user.username = req.body.username;
          user.password = hashedPassword;

          user.save((err, savedUser) => {
            if (err) {
              return res
                .status(500)
                .send({ message: `Error al crear un usuario: ${err}.` });
            }

            const token = jwt.sign(
              { id: user._id, typeUser: user.role },
              config.SECRET_TOKEN,
              {
                expiresIn: 86400
              }
            );

            res.status(200).send({
              token: token,
              currentUser: user,
              notification: "Se ha creado el usuario correctamente."
            });
          });
        } else {
          return res
            .status(409)
            .send({ notification: "Correo electrónico en uso." });
        }
      });
    } else {
      return res
        .status(409)
        .send({ notification: "Nombre de usuario en uso." });
    }
  });
}

function signIn(req, res) {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) return res.status(500).send({ notification: err });
    if (!user)
      return res.status(404).send({ notification: "No existe el usuario." });

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!passwordIsValid)
      return res.status(401).send({
        notification: "La contraseña es incorrecta."
      });

    const token = jwt.sign({ id: user._id }, config.SECRET_TOKEN, {
      expiresIn: 86400 // expires in 24 hours
    });

    res.status(200).send({
      token: token,
      currentUser: user,
      notification: "Has ingresado correctamente."
    });
  });
}

function signOut(req, res) {
  res.status(200).send({
    token: null,
    notification: "Haz cerrado sesión correctamente."
  });
}

function getUsers(req, res) {
  User.find({}, { password: 0 })
    .populate("reports")
    .exec((err, user) => {
      if (err) {
        return res
          .status(500)
          .send({ notification: "No se pueden mostrar los usuarios." });
      }
      return res.status(200).send(user);
    });
}

function getUser(req, res) {
  User.find({ username: req.query.username }, { password: 0 })
    .populate("reports")
    .exec((err, user) => {
      if (err) {
        res
          .status(500)
          .send({ notification: "Hubo un problema al encontrar el usuario." });
      } else {
        res.send(user);
      }
    });
}

module.exports = {
  signUp,
  signIn,
  signOut,
  getUsers,
  getUser
};
