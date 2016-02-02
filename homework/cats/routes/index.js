var express = require('express');
var router = express.Router();
var _ = require('underscore');
var catOptions = require('../catNamesAndColors');
var catModel = require('../models/catModel');

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
}

function getCatColors(minColors, maxColors, allColors) {
	var numColors = Math.floor(Math.random() * (maxColors - minColors + 1)) + minColors;
	return _.shuffle(allColors).slice(0,numColors);
}

router.get('/cats/new', function (req, res, next) {
	var newCat = Cat();
	newCat.save(function (err, newCat) {
	  if (err) return console.error(err);
	  console.log("saved " + newCat.name)
	});
	res.render('cat', {message: 'You got a new Cat!', cats: [newCat]});
});

router.get('/cats', function (req, res, next) {
	catModel.find()
		.sort('age')
		.exec(function (err, allCats) {
		  if (err) return console.error(err);
		  res.render('cat', {message: 'You have these cats:', cats: allCats});
		})
	
});

router.get('/cats/bycolor/:color', function (req, res, next){
	
	catModel.find({colors: req.params.color}, function (err, colorCats) {
	  if (err) return console.error(err);
		res.render('cat', {message: 'You have these cats with color ' + req.params.color + ':', cats: colorCats});	
	})

})


router.get('/cats/delete/old', function (req, res, next){
	
	catModel.findOneAndRemove({},{sort: {age: -1}}, function(err, deletedCat) {
		if (err) return console.error(err);
		console.log(deletedCat);
		if (deletedCat){
			res.render('cat', {message: 'You removed a cat', cats: [deletedCat]});
		} else {
			res.render('cat', {message: 'You do not have any cats to "send to a farm".', cats: []});
		}
	});

})

router.get('/cats/bycolors/:color1/:color2', function (req, res, next){
	catModel.find(
		{
			colors: {$in: [req.params.color1, 
			req.params.color2]}
		})
		.sort('age').exec(function (err, colorCats) {
		  if (err) return console.error(err);
			res.render('cat', {
				message: 'You have these cats with color ' + req.params.color1 + ' or ' + req.params.color2 + ':', 
				cats: colorCats});	
	})
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
