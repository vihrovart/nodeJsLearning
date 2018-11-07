const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-body')();
const db = require("./models")
const crudRouter = require("./crudRouter")

var server = new Koa();
var router = new Router();

router.get("/", ctx => {
    ctx.body = "Hi!";
})

server
.use(router.routes())
.use(crudRouter(db.Category, bodyParser).routes())
.use(crudRouter(db.Section, bodyParser).routes())
.use(crudRouter(db.Product, bodyParser).routes())
.listen("3001");