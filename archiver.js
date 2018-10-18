var fs = require('fs');
var zlib = require('zlib');
var logger = require('./logger');

class Archiver{
  constructor(fileName, acrhiveFileName, interval){
    this.fileName = fileName;
    this.archiveFileName = acrhiveFileName;
    this.interval = interval;

    this.init();
  }

  archiveNow(){
   try {
     var fileStream = fs.createReadStream(this.fileName, "utf8");
     var fileArchiveStream = fs.createWriteStream(this.archiveFileName);
     var zip = zlib.createGzip();

     fileStream.pipe(zip).pipe(fileArchiveStream);

     logger.log("Архивирование прошло успешно");
   } catch (e) {
     logger.log("При выполнении архивации произошла ошибка");
     logger.log(e);
   }
  }

  init(){
    var self = this;
    setTimeout(function(){
      self.archiveNow();
      self.init();
    }, this.interval);
  }
}

module.exports = Archiver;
