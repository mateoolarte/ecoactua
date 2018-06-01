const Report = require("../models/report");
const User = require("../models/user");

function getReports(req, res) {
  Report.find({}, (err, reports) => {
    if (err) {
      return res
        .status(500)
        .send({ notification: "Tenemos problemas para mostrar los reportes." });
    } else {
      return res.send(reports);
    }
  }).sort({ dateCreation: "desc" });
}

function createReport(req, res) {
  const report = new Report();
  report.address = req.body.address;
  report.description = req.body.description;
  report.pointlat = req.body.pointlat;
  report.pointlong = req.body.pointlong;
  report.type = req.body.type;

  report.save((err, savedReport) => {
    if (err) {
      return res
        .status(500)
        .send({ notification: "No pudo guardar el reporte correctamente." });
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
            return res.status(500).send({
              notification:
                "No se pudo integrar el usuario al reporte correctamente."
            });
          }
        }
      );

      return res.send(savedReport);
    }
  });
}

function updateReport(req, res) {
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
        return res.status(500).send({
          err: "No se actualizo el estado del reporte correctamente"
        });
      }

      return res.send(report);
    }
  );
}

function deleteReport(req, res) {
  Report.findById(req.query.id, (err, report) => {
    if (err)
      return res
        .status(500)
        .send({ message: `Error al eliminar el reporte ${err}` });

    report.remove(err => {
      if (err) {
        return res
          .status(500)
          .send({ message: `Error al eliminar el reporte ${err}` });
      }
      return res.status(200).send({ message: `Reporte ha sido eliminado` });
    });
  });
}

module.exports = {
  getReports,
  createReport,
  updateReport,
  deleteReport
};
