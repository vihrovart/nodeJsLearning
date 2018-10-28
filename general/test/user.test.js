var users = require("../users");
var assert = require("assert");

var testUser

describe("User module tests", function(){
    it("Users - Insert user to base", function(){
        var user = {"name": "someNameTraLaLa", "age": 400};
    
        var newUser = users.addNewUser({
            user: user,
            onFail: function(message){
                throw new Error(`При создании пользователя произошла ошибка: ${message}`);
            },
            onSuccess: function(user){
                testUser = user;
            }
        });
    });
    
    it("Users - Get user by id", function(){
        if(!testUser){
            throw new Error(`Нет пользователя для тестирования`);
        }
    
        var user_received = users.getUserById(testUser.id);
    
        assert.equal(testUser.name, user_received.name);
    });
    
    it("Users - Get all users", function(){
        var users_received = users.getAllUsers();
    
        if(users_received.constructor != Array){
            throw new Error(`Полученный объект не является массивом`);
        }
    
        if(users_received.legth){
            throw new Error(`Полученный массив пуст`);
        }
    })
    
    it("Users - Remove user", function(){
        if(!testUser){
            throw new Error(`Нет пользователя для тестирования`);
        }
        
        var result = users.removeUser(testUser.id);
    
        if(!result){
            throw new Error(`Пользоватлеь для удаления не найден`);
        }
    });
});