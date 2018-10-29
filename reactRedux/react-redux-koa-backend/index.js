const Koa = require('koa');
const Router = require("koa-router")
const logger = require("koa-morgan")
//const bodyParser = require('koa-body')

const server = new Koa();
const router = new Router();

router.get("/", ctx => {
    ctx.body = "Yo.";
});

// Эндпоинт для получения данных просмотров
router.get("/getjson", async ctx => {
    return ctx.body = { "views" : 4 };
});

server
.use(logger('tiny'))
.use(router.routes())
.listen(3001);

console.log("listen 3001")