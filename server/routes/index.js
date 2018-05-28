const express = require("express");
const api = express.Router();

const verifyToken = require("../middlewares/auth");

const reportCtrl = require("../controllers/report");
const userCtrl = require("../controllers/user");

api.get("/reportes", reportCtrl.getReports);
api.post("/reporte", verifyToken, reportCtrl.createReport);
api.put("/reporte", verifyToken, reportCtrl.updateReport);
api.delete("/reporte", verifyToken, reportCtrl.deleteReport);

api.post("/ingresar", userCtrl.signIn);
api.post("/registrarse", userCtrl.signUp);
api.get("/salir", userCtrl.signOut);

api.get("/usuarios", userCtrl.getUsers);
api.get("/usuario", userCtrl.getUser);

module.exports = api;
