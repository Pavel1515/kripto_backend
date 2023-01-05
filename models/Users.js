const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const Users = sequelize.define(
  "Users",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    mail: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: "USER",
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: "USER",
    },
  },
  {}
);

module.exports = Users;
