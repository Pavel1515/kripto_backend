const jwt = require("jsonwebtoken");
const { secret } = require("../config");

module.exports = function (roles) {
  return function (req, res, next) {
    if (req.method === "OPTIONS") {
      next();
    }

    try {
      const token = req.headers.authorization.split(" ")[1];
      if (!token) {
        return res.json({ message: "Нету токена" });
      }
      const { role } = jwt.verify(token, secret);
      let hasRole = false;
      roles.forEach((el) => {
        if (el.includes(role)) {
          hasRole = true;
        }
      });
      if (!hasRole) {
        return res.json({ message: "У вас нет доступа" });
      }
      next();
    } catch (e) {
      console.log(e);
      return res.json({ message: "ошибка роли" });
    }
  };
};
