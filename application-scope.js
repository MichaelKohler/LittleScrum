(function () {
  "use strict";

  exports.init = function() {
    exports.userstories = require('./models/userstories');
  
    /** MongoDB  */
    var mongo = require('mongodb');
    var MongoServer = mongo.Server;
    var MongoDatabase = mongo.Db;
    var dbServer = new MongoServer('localhost', 27017, { auto_reconnect: true, poolSize: 1 });
    exports.db = new MongoDatabase('ls', dbServer, { safe: true });
  
    return exports;
  };
}());
