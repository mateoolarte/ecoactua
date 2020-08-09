const user = require("../models/user");

const { models } = require("../config").db;

async function getReports(req, res) {
  await models.report.sync();

  try {
    const reports = await models.report.findAll({
      order: [["dateCreation", "DESC"]],
    });

    return res.send(reports);
  } catch (err) {
    return res
      .status(500)
      .send({ notification: "Tenemos problemas para mostrar los reportes." });
  }
}

async function createReport(req, res) {
  await models.report.sync();

  const user = await models.user.findOne({
    where: {
      id: req.body.userId,
    },
    attributes: ["id"],
  });

  const report = models.report.build(
    {
      address: req.body.address,
      description: req.body.description,
      pointlat: req.body.pointlat,
      pointlong: req.body.pointlong,
      type: req.body.type,
      userId: user.dataValues.id,
    },
    {
      include: [models.user],
    }
  );

  try {
    await report.save();

    return res.send(report);
  } catch (err) {
    return res
      .status(500)
      .send({ notification: "No pudo guardar el reporte correctamente." });
  }
}

async function updateReport(req, res) {
  await models.report.sync();

  try {
    await models.report.update(
      { state: req.body.state },
      {
        where: {
          id: req.body.id,
        },
      }
    );
    const report = await models.report.findOne({
      where: {
        id: req.body.id,
      },
    });

    return res.send(report);
  } catch (err) {
    return res.status(500).send({
      err: "No se actualizo el estado del reporte correctamente",
    });
  }
}

async function deleteReport(req, res) {
  await models.report.sync();

  try {
    await models.report.destroy({
      where: {
        id: req.query.id,
      },
    });

    return res.status(200).send({ message: `Reporte ha sido eliminado` });
  } catch (err) {
    return res
      .status(500)
      .send({ message: `Error al eliminar el reporte ${err}` });
  }
}

module.exports = {
  getReports,
  createReport,
  updateReport,
  deleteReport,
};
