module.exports.getAllStories = function(db, callback) {
  db.collection('stories', function(err, collection) {
    collection.find({}, function(err, cursor) {
      cursor.toArray(function(err, items) {
        callback(items)
      });
    });
  });
};

module.exports.getAllOpenStories = function(db, callback) {
  db.collection('stories', function(err, collection) {
    collection.find({state:1}, function(err, cursor) {
      cursor.toArray(function (err, items) {
        callback(items);
      });
    });
  });
};

module.exports.getAllPoints = function(db, callback) {
  db.collection('stories', function(err, collection) {
    collection.find({}, function(err, cursor) {
      cursor.toArray(function (err, items) {
        var sum = 0;
        for (var i = 0; i < items.length; i++) {
          sum += parseInt(items[i].points);
        }
        callback(sum);
      });
    });
  });
};

module.exports.getAllOpenPoints = function(db, callback) {
  db.collection('stories', function(err, collection) {
    collection.find({state:1}, function(err, cursor) {
      cursor.toArray(function (err, items) {
        var sum = 0;
        for (var i = 0; i < items.length; i++) {
          sum += parseInt(items[i].points);
        }
        callback(sum);
      });
    });
  });
};

module.exports.addStory = function(story, db, callback) {
  db.collection('stories', function(err, collection) {
    collection.insert(story, function(err, result) {
      result ? callback(true) : callback(false);
    });
  });  
};

module.exports.closeStory = function(storyID, db, callback) {
  db.collection('stories', function(err, collection) {
    collection.update({id:parseInt(storyID)}, {$set: {state:0}}, function(err) {
      err ? callback(false) : callback(true);
    });
  });  
};
