const express = require("express");
const sequelize = require("./db");
const models = require("./models/Users");

const app = express();
const authRouter = require("./authRouter");
const port = process.env.PORT || 5000;
app.use(express.json());
app.use("/auth", authRouter);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(port, () => {
      console.log(`server start of port  ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
