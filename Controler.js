const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const { secret } = require("./config");
const Users = require("./models/Users");
const Valute = require("./models/Valute");
const Transactions = require("./models/Transactions");
const Curse = require("./models/Curse");
const generateAccessToken = (id, role) => {
  const payloud = {
    id,
    role,
  };
  return jwt.sign(payloud, secret, { expiresIn: "24h" });
};
class Controler {
  async registration(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.json("Ошибка валидации");
      }
      const { user, password } = req.body;
      const hashPassword = bcrypt.hashSync(password, 3);
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
      if (user === "ppvr3407@gmail.com") {
        await Users.create({
          mail: user,
          password: hashPassword,
          role: "ADMIN",
        });
        return res.json({ mesage: "Пользователь успешно зарегестрирован" });
      }

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
      res.json({ mesage: "Ошибка логина" });
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
  async passwordReset(req, res) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const { password, newPassword } = req.body;
      const { id } = jwt.verify(token, secret);
      if (!id) {
        return res.json("Пользователь не найден");
      }

      const userData = await Users.findOne({
        where: {
          id: id,
        },
      });
      if (!userData) {
        return res.json("Пользователь не найден");
      }
      const hash = userData.password;
      if (bcrypt.compareSync(password, hash)) {
        const hashPassword = bcrypt.hashSync(newPassword, 3);
        await Users.update(
          {
            password: hashPassword,
          },
          {
            where: {
              id: id,
            },
          }
        );
        return res.json("Пароль поменян");
      } else {
        return res.json("Неправильный пароль");
      }
    } catch (error) {
      res.json("Error users");
    }
  }

  async addTransactions(req, res) {
    try {
      const {
        commission,
        address,
        network,
        amountСoming,
        amountLeaving,
        currencyReception,
        currencyExchange,
        itFree,
      } = req.body;
      const token = req.headers.authorization.split(" ")[1];
      if (!token) {
        return res.json("Не авторизован");
      }
      const { id } = jwt.verify(token, secret);
      await Transactions.create({
        set_id: id,
        commission: commission,
        address: address,
        network: network,
        amountСoming: amountСoming,
        amountLeaving: amountLeaving,
        currencyReception: currencyReception,
        currencyExchange: currencyExchange,
        itFree: itFree,
      });
      return res.json("Новая транзакцая");
    } catch (error) {
      console.log(error);
      res.json({ mesage: "Error users" });
    }
  }
  async checkTransactions(req, res) {
    try {
      const all = await Transactions.findAll();
      res.json(all);
    } catch (error) {
      res.json(error);
    }
  }
  async updateTransactions(req, res) {
    try {
      const { status, idPost } = req.body;
      const token = req.headers.authorization.split(" ")[1];
      if (!token) {
        return res.json("Не авторизован");
      }
      await Transactions.update(
        { status: status, notification: false },
        {
          where: {
            id: idPost,
          },
        }
      );
      return res.json("транзакция обработана");
    } catch (error) {
      res.json({ mesage: error });
    }
  }
  async addValute(req, res) {
    try {
      const {
        adress,
        tittle,
        image,
        networkOne,
        networkTwo,
        networkThree,
        networkFour,
      } = req.body;
      await Valute.create({
        tittle: tittle,
        image: image,
        networkOne: networkOne,
        networkTwo: networkTwo,
        networkThree: networkThree,
        networkFour: networkFour,
        adress: adress,
      });
      return res.json({ mesage: "Ок" });
    } catch (error) {
      console.log(error);
      res.sendStatus(400).json({ mesage: "Error Valute" });
    }
  }
  async checkValute(req, res) {
    try {
      const all = await Valute.findAll();
      res.json(all);
    } catch (error) {
      res.json({ mesage: "Chek valute eroor" });
    }
  }
  async delleteValute(req, res) {
    try {
      const { id } = req.body;
      await Valute.destroy({
        where: {
          id: id,
        },
      });
      res.json("Ок");
    } catch (error) {
      console.log(error);
    }
  }
  async addCurse(req, res) {
    try {
      const { tittleOne, tittleTwo, curse } = req.body;

      await Curse.create({
        tittleOne: tittleOne,
        tittleTwo: tittleTwo,
        curse: curse,
      });
      res.json("Ок");
    } catch (error) {
      res.json({ mesage: "eroor add curse" });
    }
  }
  async checkCurese(req, res) {
    try {
      const { oneValute, twoValute } = req.body;
      const valuta = await Curse.findOne({
        where: {
          tittleOne: oneValute,
          tittleTwo: twoValute,
        },
      });
      if (valuta) {
        return res.json(valuta);
      } else {
        return res.json("пара не найденна");
      }
    } catch (error) {
      res.json({ mesage: "eroor checkCurse" });
    }
  }
  async checkList(req, res) {
    try {
      const list = await Curse.findAll();
      res.json(list);
    } catch (error) {
      res.json({ mesage: "eroor checkCurse" });
    }
  }
  async delletteCurse(req, res) {
    try {
      const { idCurse } = req.body;
      await Curse.destroy({
        where: {
          id: idCurse,
        },
      });
      res.json("Ок");
    } catch (error) {
      res.json({ mesage: "erorr  delletteCurse" });
    }
  }
}
module.exports = new Controler();
