module.exports.getAllStories = function(db, callback) {
  db.collection('stories', function(err, collection) {
    collection.find({}, function(err, cursor) {
      cursor.toArray(function(err, items) {
        console.log('fooo: ' + items.length);
        callback(items)
      });
    });
  });
};

module.exports.getAllOpenStories = function(db, callback) {
  db.collection('stories', function(err, collection) {
    collection.find({state:1}, function(err, cursor) {
      cursor.toArray(function (err, items) {
        console.log('foooopen: ' + items.length);
        callback(items);
      });
    });
  });
};

module.exports.countStories = function(stories, callback) {
  return stories.length;
}

module.exports.addStory = function(story, db, callback) {
  db.collection('stories', function(err, collection) {
    collection.insert(story, function(err, result) {
      result ? callback(true) : callback(false);
    });
  });  
};

module.exports.closeStory = function(storyID, db, callback) {
  db.collection('stories', function(err, collection) {
    collection.update({storyID:storyID}, {$set: {state:0}}, function(err, result) {
      result ? callback(true) : callback(false);
    });
  });  
};

module.exports.countTotalPoints = function(db, callback) {
  db.collection('stories', function(err, collection) {
    cursor.toArray(function(err, items) {
      var sum = 0;
      for (var i = 0; i < items.length; i++) {
        sum += parseInt(items.points);
      }
      callback(sum);
    });
  });
};
