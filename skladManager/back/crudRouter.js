const Router = require("koa-router");

function CreateRouter(model, bodyParser){
    var router = new Router();
    var urlPrefix = "/api/crud/";

    var modelName = model.name.toLowerCase();
    
    // get all items
    router.get(`${urlPrefix}${modelName}`, async ctx => {
        var items = await model.findAll();
        ctx.body = items;
    });

    // get item by id
    router.get(`${urlPrefix}${modelName}/:id`, async ctx => {
        var item = await model.findById(ctx.params.id);

        if(item != null){
            return ctx.body = item;
        }

        throw new Error("Item not found.");
    });

    // add some item
    router.post(`${urlPrefix}${modelName}`, bodyParser, async ctx => {
        var item = ctx.request.body;
        var newItem = await model.create(item);
        ctx.body = newItem;
    });
    
    // update item by id
    router.put(`${urlPrefix}${modelName}/:id`, bodyParser, async ctx => {
        var item = await model.findById(ctx.params.id);
        var newItemsValues = ctx.request.body;

        if(item != null){
            await item.update(newItemsValues);
            return ctx.body = item;
        }

        throw new Error("Item not found.");
    });

    // delete item by id
    router.delete(`${urlPrefix}${modelName}/:id`, async ctx => {
        var item = await model.destroy({ where: {id: ctx.params.id}});

        console.log(item);

        if(item){
            return ctx.body = "Ok.";
        }

        throw new Error("Item not found.");
    });

    // delete all items
    router.delete(`${urlPrefix}${modelName}`, async ctx => {
        var items = await model.destroy({ where: {}});

        console.log(items);

        if(items){
            return ctx.body = `Ok. Deleted items: ${items}`;
        }

        return ctx.body = `Ok. Have no item to delete.`;
    });

    return router;
}

module.exports = CreateRouter;