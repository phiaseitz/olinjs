routes = {}

var xmasChecker = function(){
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth();

	var christmasYN = 'NO'
	if (dd === 25 && mm === 11){
		christmasYN = 'YES'
	}

	return christmasYN;
}


routes.home = function(req, res){
	res.render('home', {isitchristmas: xmasChecker()});
};

routes.isItXmas = function(req, res) {

  	res.send(xmasChecker());
};

module.exports = routes;
