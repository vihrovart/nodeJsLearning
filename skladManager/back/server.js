const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-body')();
const logger = require("koa-morgan");
const db = require("./models")
const crudRouter = require("./crudRouter")

var server = new Koa();
var router = new Router();

router.get("/", ctx => {
    ctx.body = "Hi!";
})

server
.use(logger('tiny'))
.use(router.routes())
.use(crudRouter(db.Category, bodyParser).routes())
.use(crudRouter(db.Section, bodyParser).routes())
.use(crudRouter(db.Product, bodyParser, {include: [{model: db.Category}, {model: db.Section}]}).routes())
.listen("3001");