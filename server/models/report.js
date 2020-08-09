const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("report", {
    address: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    pointlat: {
      type: DataTypes.STRING,
    },
    pointlong: {
      type: DataTypes.STRING,
    },
    state: {
      type: DataTypes.STRING,
      defaultValue: "Pendiente",
    },
    type: {
      type: DataTypes.STRING,
    },
    dateCreation: {
      type: DataTypes.DATE,
      defaultValue: Date.now,
    },
  });
};
