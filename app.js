var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var users = require('./users');
var hbs = require('hbs');
require('./hbs_helpers');

var app = express();
var urlEncodedParser = bodyParser.urlencoded({extended: false});
var jsonParser = bodyParser.json();

app.set("view engine", "hbs");
hbs.registerPartials(__dirname + "/views/partials");

// Роутер для пользователей
var usersRouter = express.Router();
usersRouter.route("/").get(function(reg,res){
  res.render("users.hbs", {users: users.getAllUsers()});
});

usersRouter.route("/:id").get(function(req, res){
  var user = users.getUserById(req.params.id);
  res.render("user_view.hbs", user);
});

usersRouter.post("/", jsonParser, function(req, res){
  if(!req.body) return res.sendStatus(400);

  var user = {name: req.body.userName, age :req.body.userAge };

  var newUser = users.addNewUser({
    user: user,
    onFail: (x) => res.send({message: x}),
    onSuccess: (x) => res.send({id: x.id}),
  });
});

app.use("/users", usersRouter);

// Роутер
var productRouter = express.Router();

productRouter.route("/").get(function(req, res){
  res.send("<h1>Список товаров</h1>");
});

productRouter.route("/:id").get(function(req, res){
  res.send(`<h1>Описание товара:${req.params['id']}</h1>`);
});

app.use("/products", productRouter);

app.use(express.static(__dirname + '/public'));

// Валидация значений на форме
app.post("/validate", jsonParser, function (req, res) {
  if(!req.body){
    return req.sendStatus(400);
  }

  console.log(req.body.userAge);

  if(req.body.userAge < 18){
    res.json("Возраст не должен быть менее 18 лет.")
  }

  res.json("");
});

// Отправка формы
app.post("/register", urlEncodedParser, function(req, res){
  if(!req.body){
    return res.send("400");
  }

  console.log(req.body);

  res.send(`${req.body.userName} - ${req.body.userAge}`);
});

app.get("/", function(req, res){
  res.render("home.hbs", {departments: ['Moscow', 'Rostov']})
});

app.get("/about", function(req, res){
  res.send("<h2>About</h2>")
});

// Вывод по шаблону
app.get("/contacts", function(req, res){
  res.render("contact.hbs", {
    title: "Контакты",
    emails: ["blabla@bla.ru","trololo@lolo.ru"],
    phone: "555-555",
    emailsVisible: true,
  });
});

// Эхо запрос
app.get("/echo/:echo", function(req, res){
  res.send(`<h2>Echo:${req.params['echo']}</h2>`)
})

app.listen(3000);
