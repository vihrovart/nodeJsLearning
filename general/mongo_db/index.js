var db = require("mongodb").MongoClient;

// ВЫполнить действие с сервером
function execute(action){
    db.connect("mongodb://localhost:27017", { useNewUrlParser: true }, function(err, client){
        if(err){
            return console.log(err);
        }

        action(client, function(){ client.close(); });
    });
};

// ВЫполнить действие с базой данный пользователей
function executeWithUsers(action){
    execute(function(client, finalAction){
        const userDb = client.db("userDb");
        const collection = userDb.collection("users");

        action(collection, finalAction);
    });
}

// Добавить пользователя в базу
module.exports.addUser = function (user){
    executeWithUsers(function(collection, finalAction){
        collection.insertOne(user, function(err, result){
            if(err){
                finalAction();
                return console.log(err);
            }

            console.log(result.ops);
            finalAction();
        });
    });
}

// Получить всех пользователей
module.exports.getUsers = function(callback, filter){
    executeWithUsers(function(collection, finalAction){
        var cursor = filter ? collection.find(filter) : collection.find();
        cursor.toArray(function(err, res){
            callback(res);
            finalAction();
        });
    });
};

// Удалить пользователя по фильтру
module.exports.removeUser = function(filter){
    executeWithUsers(function(collection, finalAction){
        collection.deleteOne(filter, function(err, res){
            finalAction();
        });
    });
};

// Удалить пользователей по фильтру
module.exports.removeUsers = function(filter){
    executeWithUsers(function(collection, finalAction){
        collection.deleteMany(filter, function(err, res){
            finalAction();
        });
    });
};

// Удалить всех пользователей (коллекцию в частности)
module.exports.clearUsers = function(){
    executeWithUsers(function(collection, finalAction){
        collection.drop(function(err, res){
            finalAction();
        })
    });
}

// Обновление пользователя
module.exports.updateUser = function(filter, updates, callback){
    executeWithUsers(function(collection, finalAction){
        collection.updateOne(
            filter,
            { $set: updates},
            function(err, res){
                finalAction();
                callback(err,res);
            }
        );
    });
}