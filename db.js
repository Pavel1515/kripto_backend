const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  "postgres://postgres:secret@localhost:5432/db_users"
);

module.exports = sequelize;
