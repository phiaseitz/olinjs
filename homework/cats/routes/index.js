var db = require('../fakeDatabase');
var express = require('express');
var router = express.Router();
var _ = require('underscore');

//Function that constructs and returns a cat object
function Cat() {
	var possibleNames = ["Bob", "Helga", "George"]
	var possibleColors = ['Red', 'Blue', 'Green', 'Black']
	var name = possibleNames[Math.floor(Math.random() * (possibleNames.length))];
	var age = Math.floor(Math.random() * (10));

	var colors = getCatColors(1,2,possibleColors);;

	var cat = {
		name: name,
		age: age,
		colors: colors,
	};

	return cat;
}

function getCatColors(minColors, maxColors, allColors) {
	var numColors = Math.floor(Math.random() * (maxColors - minColors + 1)) + minColors;
	return _.shuffle(allColors).slice(0,numColors);
}

router.get('/cats/new', function (req, res, next) {
	console.log('new cat');
	var newCat = Cat();
	db.add(newCat);
	res.render('cat', {message: 'You got a new Cat!', cats: [newCat]});
});

router.get('/cats', function (req, res, next) {
	var allCats = db.getAll().sort(function(a,b){
		if (a.age > b.age) {
			return 1;
		} else if (a.age < b.age) {
			return -1;
		} else {
			return 0;
		}
	});
	console.log(allCats);
	res.render('cat', {message: 'You have these cats:', cats: allCats});
});

router.param('color', function (req, res, next, color) {
	var allCats = db.getAll().sort(function(a,b){
		if (a.age > b.age) {
			return 1;
		} else if (a.age < b.age) {
			return -1;
		} else {
			return 0;
		}
	});

	catsWithColor = allCats.filter(function (cat){
		return _.contains(cat.colors, color);
	})

	res.render('cat', {message: 'You have these cats with color ' + color + ':', cats: catsWithColor});

	next();
})

router.get('/cats/bycolor/:color', function (req, res, next){
	console.log('Color!');
})


router.get('/cats/delete/old', function (req, res, next){
	allCats = db.getAll();

	

	if (allCats.length === 0){
		res.render('cat', {message: 'You do not have any cats to "send to a farm".', cats: []});
	} else {
		var maxAge = -1;
		var oldestIndex = -1;

		for (i = 0; i < allCats.length ; i++){
			if (allCats[i].age > maxAge){
				oldestIndex = i;
				maxAge = allCats[i].age;
			}
		}

		removedCats = db.remove(oldestIndex)
		res.render('cat', {message: 'You removed a cat', cats: removedCats});
	}

})




module.exports = router;
