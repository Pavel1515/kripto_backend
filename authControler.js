const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const { secret } = require("./config");
const Users = require("./models/Users");
const Transactions = require("./models/Transactions");
const generateAccessToken = (id, role) => {
  const payloud = {
    id,
    role,
  };
  return jwt.sign(payloud, secret, {});
};
class authControler {
  async registration(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.json("Ошибка валидации");
      }
      const { user, password } = req.body;
      const candidat = await Users.findOne({
        where: {
          mail: user,
        },
      });
      if (candidat) {
        return res
          .status(400)
          .json({ mesage: "Пользователь с таким email существует" });
      }
      const hashPassword = bcrypt.hashSync(password, 3);
      await Users.create({ mail: user, password: hashPassword });
      return res.json({ mesage: "Пользователь успешно зарегестрирован" });
    } catch (error) {
      console.log(error);
      res.sendStatus(400).json({ mesage: "Error registration" });
    }
  }
  async login(req, res) {
    try {
      const { user, password } = req.body;
      const users = await Users.findOne({
        where: {
          mail: user,
        },
      });
      if (!users) {
        return res.json("не найден пользователь");
      }
      const hash = users.password;
      if (bcrypt.compareSync(password, hash)) {
        const token = generateAccessToken(users.id, users.role);
        return res.json({ token });
      } else {
        return res.json("Неправильный пароль");
      }
    } catch (error) {
      console.log(error);
      res.json({ mesage: "Error login" });
    }
  }
  async users(req, res) {
    try {
      const all = await Users.findAll();
      const alllist = await Transactions.findAll();
      return res.status(400).json({
        users: all,
        list: alllist,
      });
    } catch (error) {
      res.sendStatus(400).json({ mesage: "Error users" });
    }
  }
  async user(req, res) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const { id } = jwt.verify(token, secret);
      const userData = await Users.findOne({
        where: {
          id: id,
        },
      });
      const userList = await Transactions.findAll({
        where: {
          set_id: id,
        },
      });
      return res.json({ userData, userList });
    } catch (error) {
      res.json({ mesage: "Error users" });
    }
  }
  async addTransactions(req, res) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      if (!token) {
        return res.json("Не авторизован");
      }
      const { id } = jwt.verify(token, secret);
      if (!req.body.receipt) {
        return res.json("Нету квитанции");
      }
      await Transactions.create({
        set_id: id,
        receipt: req.body.receipt,
      });
      return res.json("Ок");
    } catch (error) {
      res.json({ mesage: "Error users" });
    }
  }
}
module.exports = new authControler();
