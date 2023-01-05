const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const Transactions = sequelize.define(
  "Transactions",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    set_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    receipt: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {}
);

module.exports = Transactions;
