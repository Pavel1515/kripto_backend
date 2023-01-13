const Router = require("express");
const { check } = require("express-validator");
const router = new Router();
const controler = require("./Controler");
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
router.post("/password", authMiddlwaer, controler.passwordReset);
router.post("/add", authMiddlwaer, controler.addTransactions);
router.post(
  "/processing",
  roleMiddleware(["ADMIN"]),
  controler.updateTransactions
);
router.post("/addvalute", roleMiddleware(["ADMIN"]), controler.addValute);
router.get("/chekvalute", controler.checkValute);
router.post(
  "/deletevalute",
  roleMiddleware(["ADMIN"]),
  controler.delleteValute
);
router.post("/addcurse", roleMiddleware(["ADMIN"]), controler.addCurse);
router.post("/chekcurse", controler.checkCurese);
router.get("/chek", controler.checkList);
router.post("/deletecurse", roleMiddleware(["ADMIN"]), controler.delletteCurse);
router.get("/all", controler.checkTransactions);
module.exports = router;
