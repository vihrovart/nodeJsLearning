var fs = require('fs');
var util = require('util');

var fileName = 'log.txt';

var logger = {
  fileLogName: fileName,
  fileLogNameArchive: `${fileName}.gzip`,
  log: function (message) {
    var date = new Date();
    message = `${date.toLocaleTimeString()} - ${util.inspect(message)}\n`;
    fs.appendFileSync(logger.fileLogName, message);
    console.log(message);
  },
};

module.exports = logger;
