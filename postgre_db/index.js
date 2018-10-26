const sequelize = require("sequelize");

const seq = new sequelize("nodejs", "postgres", "1q2w3e$R", {
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

// Проверка подключения
module.exports.testConnection = function () {
    seq.authenticate()
    .then(() => {
        console.log("Connect success!");
    })
    .error(err => {
        console.error("Connect fail", err);
    });
};

// Населенный пункт
module.exports.City = City = seq.define("city", {
    name: {type: sequelize.STRING, unique: true, 
        set(val){
            this.setDataValue('name', val.toUpperCase());
        }
    }
});

// Категории заметок
module.exports.NoteCtegory = NoteCategory = seq.define("noteCategory", {
    name: {type: sequelize.STRING }
});

// Заметки
module.exports.Note = Note = seq.define("note", {
    name: {type: sequelize.STRING},
    text: {type: sequelize.TEXT}
});

NoteCategory.hasMany(Note);

// Пользователь
module.exports.User = User = seq.define("user", {
    name: { type: sequelize.STRING },
    age: { type: sequelize.INTEGER }
});

    // Свзяь между населенным пунктом и пользователем
    City.hasMany(User);
    User.belongsTo(City);

    User.hasMany(Note);

module.exports.sequelize = seq;

/*
City.sync({force: true}).then(() => {
    City.create( {name:"New York" });
    City.create( {name:"Paris" });
    City.create( {name:"London" });

    User.sync({force: true});
});
*/

 /*.then(() => {
    return User.create({
        name: "User1",
        age: 14
    }).then(() => {
        User.findAll().then(users => {
            console.log(users);
        })
    });
});
*/