var app = require('../application-scope').init();

exports.index = function(req, res) {
  res.render('index', { locals: { } });
};

exports.error = function(req, res) {
  res.render('error', { locals: { } });
};

exports.newStory = function(req, res) {
  res.render('new', { locals: { } });
};

exports.addStory = function(req, res) {
  var story = { id: Math.floor(Math.random() * 10000000),
                req: req.body['req'],
                points: req.body['points'],
                desc: req.body['desc'],
                assignee: req.body['assignee']
              };
  app.userstories.addStory(story, app.db, function(success) {
    success ? res.redirect('/') : res.redirect('/error');
  });
};

exports.closeStory = function(req, res) {
  res.redirect('/');
}
