var home = function(req, res){
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth();

	var christmasYN = 'NO'
	if (dd === 25 && mm === 11){
		christmasYN = 'YES'
	}

  res.render('home',{"isitchristmas": christmasYN});
};

module.exports.home = home;
