var db = require('../fakeDatabase');
var express = require('express');
var router = express.Router();
var _ = require('underscore');
var catOptions = require('../catNamesAndColors')

//Function that constructs and returns a cat object
function Cat() {
	var possibleNames = catOptions.names;
	var possibleColors = catOptions.colors;
	var name = possibleNames[Math.floor(Math.random() * (possibleNames.length))];
	var age = Math.ceil(Math.random() * (10));

	var colors = getCatColors(1,5,possibleColors);;

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
	var allCats = db.getAll();
	console.log(allCats);
	res.render('cat', {message: 'You have these cats:', cats: allCats});
});

router.param('color', function (req, res, next, color) {
	var allCats = db.getAll();

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
		allCats.length

		removedCats = db.remove(allCats.length - 1)
		res.render('cat', {message: 'You removed a cat', cats: removedCats});
	}

})

router.get('/', function (req, res, next){
	res.render('home', {message: "Welcome to Cats!", 
		links: [{
				text: 'Create a New Cat',
			 	link: '/cats/new',
			}, {
				text: 'See Your Cats',
			 	link:'/cats'
			}, {
				text: 'Sort Cats by a Random Color',
				link: (function () {
					randomColorInt = Math.floor(Math.random() * (catOptions.colors.length));
					randomColor = catOptions.colors[randomColorInt];
					return 'cats/bycolor/' + randomColor}),
			}, {
				text: 'Delete Your Oldest Cat',
				link: 'cats/delete/old',
			}]})

})



module.exports = router;
