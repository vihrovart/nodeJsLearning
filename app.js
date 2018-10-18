var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var urlEncodedParser = bodyParser.urlencoded({extended: false});
var jsonParser = bodyParser.json();

var productRouter = express.Router();

productRouter.route("/").get(function(req, res){
  res.send("<h1>Список товаров</h1>");
});

productRouter.route("/:id").get(function(req, res){
  res.send(`<h1>Описание товара:${req.params['id']}</h1>`);
});

app.use("/products", productRouter);

app.use(express.static(__dirname + '/public'));

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

app.post("/register", urlEncodedParser, function(req, res){
  if(!req.body){
    return res.send("400");
  }

  console.log(req.body);

  res.send(`${req.body.userName} - ${req.body.userAge}`);
});

app.get("/", function(req, res){
  res.send("<h2>Hello!</h2>");
});

app.get("/about", function(req, res){
  res.send("<h2>About</h2>")
})

app.get("/contacts", function(req, res){
  res.send("<h2>Contacts</h2>")
})

app.get("/echo/:echo", function(req, res){
  res.send(`<h2>Echo:${req.params['echo']}</h2>`)
})

app.listen(3000);
