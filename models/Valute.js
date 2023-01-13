const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const Valute = sequelize.define(
  "Valute",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    tittle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    adress: { type: DataTypes.STRING },
    image: { type: DataTypes.STRING },
    networkOne: { type: DataTypes.STRING },
    networkTwo: { type: DataTypes.STRING },
    networkThree: { type: DataTypes.STRING },
    networkFour: { type: DataTypes.STRING },
  },
  {}
);
module.exports = Valute;
