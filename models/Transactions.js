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
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    network: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    notification: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    amount: {
      type: DataTypes.INTEGER,
    },
    currencyReception: {
      type: DataTypes.STRING,
    },
    currencyExchange: {
      type: DataTypes.STRING,
    },
    itFree: {
      type: DataTypes.BOOLEAN,
    },
  },
  {}
);

module.exports = Transactions;
