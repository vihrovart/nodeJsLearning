const Koa = require('koa');
const Router = require("koa-router")
const logger = require("koa-morgan")
const bodyParser = require('koa-body')() // <---- Обрати внимание, ты на это потратил пол дня, если не стоит () то в эпике он не видит роут с применением этого парсера

const { Item } = require("./db");

const server = new Koa();
const router = new Router();

router.get("/", ctx => {
    ctx.body = "Yo.";
});

router.post("/api/addItem", bodyParser, async ctx => {
    var item = ctx.request.body;
    var newItem = await Item.create(item);
    ctx.body = newItem;

})

// Эндпоинт для получения данных из базы
router.get("/api/getitems", async ctx => {
    const items = await Item.findAll();

    ctx.body = { items: items };
});

// Эндпоинт для получения данных просмотров
router.get("/api/getjson", async ctx => {
    return ctx.body = { "views" : 4 };
});

server
.use(logger('tiny'))
.use(router.routes())
.listen(3001);

console.log("listen 3001")