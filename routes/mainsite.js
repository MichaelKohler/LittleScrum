exports.index = function(req, res) {
  res.render('index', { locals: { } });
};

exports.newIssue = function(req, res) {
  res.render('new', { locals: { } });
};

exports.fuckit = function(req, res) {
  res.render('fuckit', { locals: { } });
}

exports.addNew = function(req, res) {
  // add new!
  // ...
  res.redirect('/');
}

exports.closeIssue = function(req, res) {
  // delete it!
  // ...
  res.redirect('/');
}
