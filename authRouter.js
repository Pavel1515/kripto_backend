const Router = require("express");
const { check } = require("express-validator");
const router = new Router();
const controler = require("./authControler");
const authMiddlwaer = require("./middelwaerr/authMiddlwaer");
const roleMiddleware = require("./middelwaerr/roleMiddleware");

router.post(
  "/registration",
  [
    check("user", "Имя пользователя не может быть пустым").notEmpty(),
    check("password", "Пароль не может быть пустым").notEmpty(),
  ],
  controler.registration
);
router.post("/login", controler.login);
router.get("/users", roleMiddleware(["ADMIN"]), controler.users);
router.get("/user", authMiddlwaer, controler.user);
router.post("/add", authMiddlwaer, controler.addTransactions);

module.exports = router;
