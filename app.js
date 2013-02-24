(function () {
  "use strict";

  var app = require('./application-scope').init();

  var express = require('express');
  var server = express();

  /** SERVER **/
  server.configure(function () {
    server.set('port', 2222);
    server.set('publicfolder', 'public');
    server.use('/bootstrap', express.static(server.get('publicfolder') + '/bootstrap'));
    server.use('/css', express.static(server.get('publicfolder') + '/css'));
    server.use('/js', express.static(server.get('publicfolder') + '/js'));
    server.set('view engine', 'jade');
    server.set('views', __dirname + '/views');
    server.set('view options', { layout: false });
    server.use(express.bodyParser());
  });

  server.configure('development', function() { 
    server.use(express.logger('dev'));
  });

  server.listen(server.get('port'), function() {
    console.log("Server started on port " + server.get('port'));
  });

  /** MONGO DB **/
  app.db.open(function(err, db){
    if(err)
      console.log(err);
  });

  /** ROUTES **/
  var mainsiteRoutes = require('./routes/mainsite.js');
  server.get('/', mainsiteRoutes.index);
  server.get('/error', mainsiteRoutes.error);
  server.get('/new', mainsiteRoutes.newStory);
  server.post('/add', mainsiteRoutes.addStory);
  server.post('/close', mainsiteRoutes.closeStory);
  
}());
