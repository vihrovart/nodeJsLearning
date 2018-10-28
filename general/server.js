var http = require('http');
var url = require('url');
var fs = require('fs');

var logger = require('./logger');
var acrhiverClass = new require('./archiver');
var archiver = new acrhiverClass(logger.fileLogName,logger.fileLogNameArchive,10000);

var server = new http.Server();
server.listen('8889', '127.0.0.1');

var emit = server.emit;

server.emit = function (event) {
    logger.log(event);
    emit.apply(server, arguments);
  };

server.on('request', function (req, res) {
  var urlParsed = url.parse(req.url, true);

  console.log(urlParsed);

  initResponse(urlParsed.pathname, urlParsed, res);
});

function initResponse(action, urlParsed, res){
  var actions = [];
  actions.push({name: '/echo', action: function(){ echo(res ,urlParsed.query.message); }});
  actions.push({name: '/getlogfile', action: function(){ downloadLogFile(res); }});

  var findActionInArray = function (element, index, array){
    return element.name == action;
  };

  var actionElement = actions.find(findActionInArray);

  if(actionElement == undefined){
    pageNotFound(res);
    return;
  }

  actionElement.action();
}

function downloadLogFile(res){
  console.log(archiver.fileName);
  archiver.archiveNow();
  res.setHeader('Content-Disposition', `attachment; filename="${logger.fileLogNameArchive}"`);
  fs.createReadStream(logger.fileLogNameArchive).pipe(res);
}

function pageNotFound(res){
  logger.log(404);
  res.statusCode = 404;
  res.setHeader('Content-type', 'text/html; charset=UTF-8;');
  res.end('PnF!');
}

function echo(res, message){
  res.end(message);
  logger.log(`echo message:${message}`);
}
