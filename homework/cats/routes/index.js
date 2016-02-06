var express = require('express');
var router = express.Router();
var _ = require('underscore');
var catOptions = require('../catNamesAndColors'); // I like that this is an importable module :)
var catModel = require('../models/catModel'); // Just so you're aware, it's convention to name your cat model "Cat"
																							// (though in this case that conflicts with your constructor below)

//Function that constructs and returns a cat object
function Cat() {
	var possibleNames = catOptions.names;
	var possibleColors = catOptions.colors;
	var name = possibleNames[Math.floor(Math.random() * (possibleNames.length))];
	var age = Math.ceil(Math.random() * (10));

	var colors = getCatColors(1,5,possibleColors);;

	var cat = catModel({
		name: name,
		age: age,
		colors: colors,
	});

	return cat;
	/*
	I think I would have wrapped more of the random cat generation logic into the catNamesAndColors
	module -- maybe the module exports a function which makes random cat data.

	Then you could:
	var getRandomCatData = require('../catNamesAndColors');
	var Cat = require('../models/catModel'); // (as per convention)

	and later on,
	var newCat = Cat(getRandomCatData());

	Reasoning for that --
	- the random cat generation doesn't really have to do with routing, and this is a routing file
	- the file with cat names and colors can export less -- a slightly neater "black-boxing"
	*/
}

function getCatColors(minColors, maxColors, allColors) {
	var numColors = Math.floor(Math.random() * (maxColors - minColors + 1)) + minColors;
	return _.shuffle(allColors).slice(0,numColors); // yay for toolchain libraries!
}

router.get('/cats/new', function (req, res, next) {
	var newCat = Cat();
	newCat.save(function (err, newCat) {
	  if (err) return console.error(err);
	  // Make sure you clean up your debugging mechanisms (e.g. console.log statements) --
	  // if this were a production app, you'd fill up your log files in no time at all :/
	});
	res.render('cat', {message: 'You got a new Cat!', cats: [newCat]});
});

router.get('/cats', function (req, res, next) {
	catModel.find()
		.sort('age')
		.exec(function (err, allCats) {
		  if (err) return console.error(err);
		  res.render('cat', {message: 'You have these cats:', cats: allCats});
		});
});

router.get('/cats/bycolor/:color', function (req, res, next){
	catModel.find({colors: req.params.color}, function (err, colorCats) {
	  if (err) return console.error(err);
		res.render('cat', {
			message: 'You have these cats with color ' + req.params.color + ':', 
			cats: colorCats
		});	
		// I like the multi-line object convention -- otherwise lines get long quickly
	});
});


router.get('/cats/delete/old', function (req, res, next){
	
	catModel.findOneAndRemove({},{sort: {age: -1}}, function(err, deletedCat) { // nice use of the in-place sort function
		if (err) return console.error(err);
		if (deletedCat){
			res.render('cat', {
				message: 'You removed a cat', 
				cats: [deletedCat]
			});
		} else {
			res.render('cat', {
				message: 'You do not have any cats to "send to a farm".', 
				cats: []
			});
		}

		/*
		You could also have done this:

		var renderData = deletedCat ? {
			message: 'You removed a cat', 
			cats: [deletedCat]
		} : {
			message: 'You do not have any cats to "send to a farm".', 
			cats: []
		};
		res.render('cat', renderData);

		The var whatever = booleanExpression ? valueIfTrue : valueIfFalse;
		syntax is called "ternary logic" -- you might have seen something similar elsewhere.

		I think either way's good in this case -- just pointing this out because sometimes 
		one way might be significantly cleaner or easier to think about than the other.
		*/ 
	});
});

router.get('/cats/bycolors/:color1/:color2', function (req, res, next){
	catModel.find({
			colors: {$in: [req.params.color1, req.params.color2]} // nice advanced query!
		})
		.sort('age').exec(function (err, colorCats) {
		  if (err) return console.error(err);
			res.render('cat', {
				// How could you handle more of the message construction in your templating?
				// Open-ended question -- you don't necessarily need to, and there are lots of ways you could
				message: 'You have these cats with color ' + req.params.color1 + ' or ' + req.params.color2 + ':', 
				cats: colorCats
			});	
	});
});

router.get('/', function (req, res, next){
	res.render('home', {message: "Welcome to Cats!", 
		links: [{
				text: 'Create a New Cat',
			 	link: '/cats/new',
			}, {
				text: 'See Your Cats',
			 	link:'/cats'
			}, {
				text: 'Get all Cats with Random Color',
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
