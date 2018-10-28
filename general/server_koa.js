const Koa = require('koa');
const logger = require("koa-morgan");
const Router = require("koa-router");
const bodyParser = require("koa-body")();

const server = new Koa();
const router = new Router();

router.get("/", ctx => {
    ctx.body = "Root..";
});

router.post("/item", bodyParser, ctx => {
    ctx.body = { item: ctx.request.body };
});

server
.use(logger("tiny"))
.use(router.routes())
.listen(3001);