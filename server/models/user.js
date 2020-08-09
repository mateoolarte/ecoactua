const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "user",
    {
      email: {
        type: DataTypes.STRING,
        unique: true,
      },
      username: {
        type: DataTypes.STRING,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
      },
      role: {
        type: DataTypes.STRING,
        defaultValue: "user",
      },
      firstName: {
        type: DataTypes.STRING,
      },
      lastName: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: "users",
    }
  );
};
