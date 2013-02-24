var app = require('../application-scope').init();

exports.index = function(req, res) {
  app.userstories.getAllPoints(app.db, function(allPoints) {
    app.userstories.getAllOpenStories(app.db, function(openItems) {
      app.userstories.getAllOpenPoints(app.db, function(openPoints) {
        res.render('index', { locals: {
                     openStories: openItems,
                     total: allPoints || 0,
                     open: openPoints || 0
                  }});
      });
    });
  });
};

exports.error = function(req, res) {
  res.render('error', { locals: { } });
};

exports.all = function(req, res) {
  app.userstories.getAllStories(app.db, function(items) {
    res.render('all', { locals: {
                 stories: items
              }});
  });
};

exports.newStory = function(req, res) {
  res.render('new', { locals: { } });
};

exports.addStory = function(req, res) {
  var story = { id: Math.floor(Math.random() * 10000000),
                req: req.body['req'],
                points: req.body['points'],
                desc: req.body['desc'],
                assignee: req.body['assignee'],
                state: 1
              };
  app.userstories.addStory(story, app.db, function(success) {
    success ? res.redirect('/') : res.redirect('/error');
  });
};

exports.closeStory = function(storyID, req, res) {
  app.userstories.closeStory(storyID, app.db, function(success) {
    success ? res.redirect('/') : res.redirect('/error');
  });
}
