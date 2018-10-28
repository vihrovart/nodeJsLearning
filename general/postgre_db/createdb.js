var db = require("./index.js");

// Создание таблиц в базе
db.sequelize.sync({force: true}).then(() => {
    console.log("Tables has created");

    createDefault();
});

// Создание сущностей по умолчанию
function createDefault(){
    console.log("LOG1");
    var create = async function(){
        await db.City.create( {name:"New York" });
        db.City.create( {name:"Paris" });
        db.City.create( {name:"London" }).then(async city => {
            var user = await db.User.create({name: "admin"});
            await user.setCity(city);
            db.User.findOne({where: { id: user.id}, include: [ City ]}).then(findedUser => {
                console.log(findedUser.city.name + " " + findedUser.name);
            });

            console.log("LOG-1");
            const a = await db.City.findAll({ include: [ User ]});
            console.log("LOG-2 ");
            console.log(a);
            
        });
    }

    create().then(() => {
        console.log("Сущности созданы");
    });
    

    console.log("LOG2");
}
