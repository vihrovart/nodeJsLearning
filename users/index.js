var fs = require("fs");

var usersFileName = "./users/users.json";
var codepageDefault = "UTF8";

var users = {
  getAllUsers: function(){
    var content = fs.readFileSync(usersFileName, codepageDefault);
    var users = JSON.parse(content);
    return users;
  },
  getUserById: function(id){
    var users = this.getAllUsers();
    var user = users.find((x) => x.id == id);
    return user;
  }
};

module.exports = users;
