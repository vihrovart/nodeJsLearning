var db = require("./mongo_db");

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

var names = ['Mike', 'Anne', 'Olli', 'John', 'Slava', 'Ivan', 'Nikolay'];
var newUserNameIndex = getRandom(0, names.length);

db.addUser({name: names[newUserNameIndex], age: getRandom(15, 99)});

function getAllUsersAndLog(){
    db.getUsers(function(res){
        console.log("Получение всех пользователей");
        console.log(res);
    })
}

getAllUsersAndLog();

db.getUsers(function(res){
    console.log("Получение пользователей возраст которых менее 50 лет");
    console.log(res);
}, {age: { $lt: 50}});

db.getUsers(function(res){
    console.log("Получение пользователей возраст которых более 50 лет (включительно)");
    console.log(res);
}, {age: { $gte: 50}});

console.log("Удаление пользователей");
db.removeUser({name: "Slava"});
db.removeUsers({name: "Nikolay"});

db.updateUser({ name: "John", age: 34}, {age: 35}, function(err, res){
    console.log("Обновление пользователя");
    if(err){
        console.log(err);
        return;
    }

    getAllUsersAndLog();
});