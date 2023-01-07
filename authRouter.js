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
router.put("/password", authMiddlwaer, controler.passwordReset);
router.post("/add", authMiddlwaer, controler.addTransactions);
router.get("/all", roleMiddleware(["ADMIN"]), controler.checkTransactions);
router.put(
  "/processing",
  roleMiddleware(["ADMIN"]),
  controler.updateTransactions
);
router.post("/addvalute", roleMiddleware(["ADMIN"]), controler.addValute);
router.get("/chekvalute", controler.checkValute);
router.delete(
  "/deletevalute",
  roleMiddleware(["ADMIN"]),
  controler.delleteValute
);
router.post("/addcurse", roleMiddleware(["ADMIN"]), controler.addCurse);
router.get("/chekcurse", controler.checkCurese);
router.delete(
  "/deletecurse",
  roleMiddleware(["ADMIN"]),
  controler.delletteCurse
);
module.exports = router;
