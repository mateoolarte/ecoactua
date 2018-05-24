const path = require("path");
const express = require("express");
const reportCtrl = require("../controllers/report");
const userCtrl = require("../controllers/user");
const verifyToken = require("../middlewares/auth");
const api = express.Router();

api.get("/reportes", reportCtrl.getReports);
api.post("/reporte", verifyToken, reportCtrl.createReport);
api.put("/reporte", verifyToken, reportCtrl.updateReport);
api.delete("/reporte", verifyToken, reportCtrl.deleteReport);

api.post("/registrarse", userCtrl.signUp);
api.post("/ingresar", userCtrl.signIn);
api.get("/salir", userCtrl.signOut);
api.get("/usuarios", userCtrl.getUsers);
api.get("/usuario", userCtrl.getUser);

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
api.get("/*", (req, res) => {
  return res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

module.exports = api;
