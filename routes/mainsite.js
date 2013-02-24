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
  userstories.create(req.body['req'], req.body['points'], req.body['desc'], req.body['assignee'], db,
                     function(story) {
                       userstories.addStory(story, db, function(success) {
                         success ? res.redirect('/') : res.redirect('/error');
                       });
                     }                 
  );
  res.redirect('/error');
};

exports.closeStory = function(req, res) {
  res.redirect('/');
}
