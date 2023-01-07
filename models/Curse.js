const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const Curse = sequelize.define(
  "Curse",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    tittleOne: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tittleTwo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    curse: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {}
);
module.exports = Curse;
