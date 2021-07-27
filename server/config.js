const { Sequelize } = require("sequelize");

function applyAssociations(db) {
  const { user, report } = db.models;

  user.hasMany(report);
  report.belongsTo(user);
}

const sequelize = new Sequelize(
  `${process.env.DATABASE_URL}` || "postgres://localhost:5432/postgres",
  {
    dialect: "postgres",
    logging: false,
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
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
