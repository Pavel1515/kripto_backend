npm run start - запуск приложения деплоя

npm run dev - запуск режима разроботчика

Endpoint:
-app.post( "/registration") ожидаемые данные:
body{user,password}
-app.post("/login") ожидаемые данные:
body {user,password} ответ сохраняяемый токен
-app.get ("/users") ожидаемые данные:
headers {Authorization :Bearer  token}  token - сохраненый токен, для админа
-app.get("/user") ожидаемые данные:
headers {Authorization :Bearer  token}
-app.post("/add") ожидаемые данные:
headers {Authorization :Bearer  token} and body {receipt}