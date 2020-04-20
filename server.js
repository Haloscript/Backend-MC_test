const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const db = require("./app/config/db_config.js");

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "DELETE, POST, GET, PUT, OPTIONS");
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  // console.log(res);

  next();
});

// const cors = require('cors')
// const corsOptions = {
//     origin: 'http://localhost:3000',
//     optionsSuccessStatus: 200
// }
//
// app.use(cors(corsOptions))

app.get("/", function (req, res) {
  res.send("Hello World!");
});
require("./app/router/Good_route.js")(app);
require("./app/router/User_route.js")(app);

const User = db.user;
const Good = db.good;
db.sequelize
	.sync({
		force: true,
	})
	.then(() => {
		console.log('Drop and Resync with { force: true }');
		initial();
	});
function initial() {
  for (let i = 0; i < 4; i++) {
    User.create({
      firstName: `Ирина ${i + i}`,
      lastName: "Попова",
      middleName: "Александровна",
      position: "Бухгалтер",
    }).then((user) => {
      for (let i = 0; i < 4; i++) {
        Good.create({
          title: `Стационарный компьютер ${i + 1}`,
          price: 80000 * (i + 1),
          registrationDate: new Date(),
          owner_id: user.id,
        });
      }
    });
    User.create({
      firstName: `Диас ${i + i}`,
      lastName: "Кураков",
      middleName: "",
      position: "Сис Админ",
    }).then((user) => {
      for (let i = 0; i < 2; i++) {
        Good.create({
          title: `Монитор 27″${i + 1}`,
          price: 60000 * (i + 1),
          registrationDate: new Date(),
          owner_id: user.id,
        });
      }
    });
    User.create({
      firstName: `Ильяс ${i + i}`,
      lastName: "Бекмаханов",
      middleName: "",
      position: "Backend developer",
    }).then((user) => {
      for (let i = 0; i < 2; i++) {
        Good.create({
          title: "MacBook pro 13″",
          price: 60000 * (i + 1),
          registrationDate: new Date(),

          owner_id: user.id,
        });
      }
    });
  }
}

app.listen(9090, function () {
  console.log("Example server listening on port 9090!");
});
