var routes = {};

routes.home = function(req, res, next) {
  res.render("home");
}

module.exports = routes;