const Koa = require("koa");
const koaBody = require("koa-body")();
const Router = require("koa-router");
const logger = require("koa-morgan");
const db = require("./models");
const Task = db.task;

const app = new Koa();
const router = new Router();

// Получить все задачи
router.get("/items", async ctx => {
    var tasks = await Task.findAll();

    ctx.body = tasks;

    console.log(ctx.hello);
});

// Создать задачу
router.post("/item", koaBody, ctx => {
    var model = ctx.request.body;
    Task.create(model);
    ctx.body = "Ok!";
});

// Получить задачу по ее ид
router.get("/item", async ctx => {
    await getTaskByCtx(ctx).then(task => ctx.body = task).catch(err => ctx.body = err);
});

// Удалить задачу
router.delete("/item", async ctx => {
    await getTaskByCtx(ctx).then(task => {
        task.destroy();
        ctx.body = "Ok";
    }).catch(err => ctx.body = err);
});

// Изменить задачу
router.put("/item", koaBody, async ctx => {
    await getTaskByCtx(ctx).then(async task => {
        var model = ctx.request.body;
        await task.update(model);
        ctx.body = "Ok."
    }).catch(err => ctx.body = err);
});

async function getTaskByCtx(ctx) {
    return new Promise(async (resolve, reject) => {
        var itemId = ctx.query.id;

        if(!itemId){
            reject("Item id attribute not found");
        }

        var task = await Task.findOne({where: {id: itemId}});

        if(task){
            resolve(task);
        }else{
            reject("Not found task");
        }
    });
};

app.use(logger("tiny"));
app.use(router.routes());

if(!module.parent) app.listen(3002);