var express = require('express');
var server = express.createServer();
var users = require('./models/userstories');

server.configure(function () {
  server.set('port', 2222);
  server.set('publicfolder', 'public');
  server.use('/bootstrap', express.static(__dirname + server.get('publicfolder') + '/bootstrap'));
  server.use('/css', express.static(__dirname + server.get('publicfolder') + '/css'));
  server.use('/js', express.static(__dirname + server.get('publicfolder') + '/js'));
  server.set('view engine', 'jade');
  server.set('views', __dirname + '/views');
  server.set('view options', { layout: false });
  server.use(express.bodyParser());
  server.use(express.cookieParser({ secret: "keyboard cat" }));
  var memStore = require('connect').session.MemoryStore;
  server.use(express.session({ secret: "keyboard cat", store: memStore( {
    reapInterval: 60000 * 10
  })}));
});

server.configure('development', function() { 
  server.use(express.logger('dev'));
});

server.listen(server.get('port'), function() {
  console.log("Server started on Port " + server.get('port'));
});


/** MongoDB  */
var mongo = require('mongodb');
var MongoServer = mongo.Server;
var MongoDatabase = mongo.Db;
var dbServer = new MongoServer('localhost', 27017, { auto_reconnect: true, poolSize: 1 });
var db = new MongoDatabase('ls', dbServer, { safe: true });

db.open(function(err, db){
  if(err)
    console.log(err);
});

/** ROUTES **/
var mainsiteRoutes = require('./routes/mainsite.js');
server.get('/', mainsiteRoutes.index);
