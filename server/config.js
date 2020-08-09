const { Sequelize } = require("sequelize");

function applyAssociations(db) {
  const { user, report } = db.models;

  user.hasMany(report);
  report.belongsTo(user);
}

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    dialect: "postgres",
    host: process.env.DB_HOST,
  }
);

const modelDefiners = [require("./models/user"), require("./models/report")];

for (const modelDefiner of modelDefiners) {
  modelDefiner(sequelize);
}

applyAssociations(sequelize);

module.exports = {
  port: process.env.PORT,
  db: sequelize,
  SECRET_TOKEN: process.env.JWT_TOKEN,
};
