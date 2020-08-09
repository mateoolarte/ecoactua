const { models } = require("../config").db;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config");

async function signUp(req, res) {
  await models.user.sync();

  const usernameExist = await models.user.findOne({
    where: {
      username: req.body.username,
    },
  });
  const emailExist = await models.user.findOne({
    where: {
      email: req.body.email,
    },
  });

  if (!usernameExist && !emailExist) {
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);

    const user = models.user.build({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      username: req.body.username,
      password: hashedPassword,
    });

    try {
      await user.save();

      const token = jwt.sign(
        { id: user.id, typeUser: user.role },
        config.SECRET_TOKEN,
        {
          expiresIn: 86400,
        }
      );

      res.status(200).send({
        token: token,
        currentUser: user,
        notification: "Se ha creado el usuario correctamente.",
      });
    } catch (err) {
      return res
        .status(500)
        .send({ message: `Error al crear un usuario: ${err}.` });
    }
  } else {
    return res
      .status(409)
      .send({ notification: "Este usuario ya existe, intenta ingresar." });
  }
}

async function signIn(req, res) {
  await models.user.sync();

  try {
    const twentyFourHours = 86400;
    const user = await models.user.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!user) {
      return res
        .status(404)
        .send({ notification: "No existe el usuario, intenta registrarte." });
    }

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!passwordIsValid)
      return res.status(401).send({
        notification: "La contraseña es incorrecta.",
      });

    const token = jwt.sign({ id: user.id }, config.SECRET_TOKEN, {
      expiresIn: twentyFourHours,
    });

    res.status(200).send({
      token: token,
      currentUser: user,
      notification: "Has ingresado correctamente.",
    });
  } catch (err) {
    return res.status(500).send({ notification: err });
  }
}

function signOut(req, res) {
  res.status(200).send({
    token: null,
    notification: "Haz cerrado sesión correctamente.",
  });
}

async function getUsers(req, res) {
  await models.user.sync();
  await models.report.sync();

  try {
    const users = await models.user.findAll({
      include: models.report,
    });

    return res.status(200).send(users);
  } catch (err) {
    return res
      .status(500)
      .send({ notification: "No se pueden mostrar los usuarios." });
  }
}

async function getUser(req, res) {
  await models.user.sync();
  await models.report.sync();

  try {
    const user = await models.user.findOne({
      where: {
        username: req.body.username,
      },
      include: models.report,
    });

    res.send(user);
  } catch (err) {
    res
      .status(500)
      .send({ notification: "Hubo un problema al encontrar el usuario." });
  }
}

module.exports = {
  signUp,
  signIn,
  signOut,
  getUsers,
  getUser,
};
