var users = require("../users");

var testUser

it("Insert user to base", function(){
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