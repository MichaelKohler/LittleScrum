exports.index = function(req, res) {
  res.render('index', { locals: { user: req.session.user || ''} });
};
