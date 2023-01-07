const express = require("express");
const cors = require("cors");
const sequelize = require("./db");

const app = express();
const authRouter = require("./authRouter");
const port = process.env.PORT || 5000;
app.use(cors());
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
