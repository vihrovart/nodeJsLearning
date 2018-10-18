var express = require('express');
var bodyParser = require('body-parser');
var hbs = require('hbs');

var app = express();
var urlEncodedParser = bodyParser.urlencoded({extended: false});
var jsonParser = bodyParser.json();

app.set("view engine", "hbs");
hbs.registerPartials(__dirname + "/views/partials");

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
  res.render("home.hbs")
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
