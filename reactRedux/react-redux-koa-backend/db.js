const Sequelize = require("sequelize");

const db = new Sequelize("nodejs", "postgres", "1q2w3e$R", {
    host: "localhost",
    dialect: 'postgres',
    operatorsAliases: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

const Item = db.define('item', {
    title: Sequelize.STRING,
    count: Sequelize.INTEGER
})

db.sync({force: true}).then(() => {
    Item.create({
        title: "Item1",
        count: 540
    })
});

module.exports = {
    db,
    Item
}