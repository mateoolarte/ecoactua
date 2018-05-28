const jwt = require("jsonwebtoken");
const config = require("../config");

function verifyToken(req, res, next) {
  const token = req.headers["x-access-token"];

  if (!token)
    return res.status(403).send({ message: "Debes tener un token de acceso." });

  jwt.verify(token, config.SECRET_TOKEN, (err, decoded) => {
    if (err)
      return res
        .status(500)
        .send({ message: "Fallo al procesar el token de acceso." });

    // if everything good, save to request for use in other routes
    req.userId = decoded.id;
    next();
  });
}
module.exports = verifyToken;
