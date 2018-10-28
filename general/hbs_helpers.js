var hbs = require('hbs');

hbs.registerHelper("getTime", function(){
  var myDate = new Date();
  var hour = myDate.getHours();
  var minute = myDate.getMinutes();
  var second = myDate.getSeconds();
  if (minute < 10) {
    minute = "0" + minute;
  }
  if (second < 10) {
    second = "0" + second;
  }
  return "Текущее время: " + hour + ":" + minute + ":" + second;
});

hbs.registerHelper("createStringList", function(array){
  var result = [];

  array.forEach(function(element, index, array){
    result.push(`<li>${element}</li>`);
  });

  return new hbs.SafeString(`<ul>${result.join("")}</ul>`);
});
