var fs = require("fs");

var usersFileName = "./users/users.json";
var codepageDefault = "UTF8";

var users = {
  // Получить всех пользователей
  getAllUsers: function(){
    var content = fs.readFileSync(usersFileName, codepageDefault);
    var users = JSON.parse(content);
    return users;
  },
  // Получить пользователя по его идентификатору
  getUserById: function(id){
    var users = this.getAllUsers();
    var user = users.find((x) => x.id == id);
    return user;
  },
  // Создать нового пользователя
  addNewUser: function(options){
    var user = options.user;
    var users = this.getAllUsers();

    var validateMessage = this.validateUser(user, users);
    if(validateMessage){
      if(!options.onFail) return;

      return options.onFail(validateMessage);
    }

    user.id = this.getNextId(users);
    users.push(user);
    var data = JSON.stringify(users);
    fs.writeFileSync(usersFileName, data);

    if(!options.onSuccess) return;
    options.onSuccess(user);
  },
  // Получить свободный идентификатор
  getNextId: function(users){
    var id = Math.max.apply(Math,users.map((x) => x.id));
    return id + 1;
  },
  // Валидация пользователя
  validateUser: function (user, users){
    var self = this;
    var messages = [];
    var validatePool = [];
    validatePool.push({action: function(){return user.age < 18}, message: "Возраст не должен быть менее 18 лет"});
    validatePool.push({action: function(){return self.userExist(user, users)}, message: "Такой пользователь уже есть в базе"});

    validatePool.forEach(function(element, index, array){
      if(element.action()){
        messages.push(element.message);
      }
    });

    return messages.join('<br>');
  },
  // Пользователь уже существует в базе
  userExist: function(user, users){
    var user = users.find((x) => x.name == user.name && x.age == user.age);

    console.log(user);
    return user != undefined;
  }
};

module.exports = users;
