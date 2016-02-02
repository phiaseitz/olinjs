var express = require('express');
var router = express.Router();
var _ = require('underscore');
var ingredientModel = require('../models/ingredientModel');

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

/*
/ingredients =>
Shows a list of current ingredients (Name and Price) with Out-of-Stock and edit button.
An Add button should allow the user to specify the name and price of a new ingredient which should appear on the page without requiring a refresh.
Out-of-Stock button will tell the server to label the ingredient as disabled. The ingredient should be removed from the current page without refreshing. (Optional: make it toggleable to "add" more of the ingredient. In this case, do not remove the ingredient from the page, but make note through words or style that it is unavailable.)
Edit button allows the user to submit a new name or price for the ingredient which the server will update. The edits should change the ingredient list without refreshing.*/

router.get('/ingredients', function (req, res, next) {
	res.render('ingredients', {ingredients: [
		{
			name: "test",
			price: 12.5,
			inStock: true,
		},{
			name: "toast",
			price: 10.5,
			inStock: true,
		}]});
});

router.post('/updateIngredients', function (req, res, next){
	res.send('hello!')
});

/*
/order =>
Shows a form which allows customers to create a new burger.
There should be a checklist of all ingredients and their price.
Out-of-stock ingredients should have a disabled checkbox (<input type="checkbox" disabled>)
There should be a Submit button that will send the server the new order without refreshing the page.
You may want to refer to the Mongo reading on Referencing vs. Embedding as you think about how you will store your data. You should give your customer a nice congratulatory message for completing their order (maybe a free cat picture since you're so good at that?!)
A running counter of total cost: Should update whenever a new ingredient is added or removed.

*/

router.get('/order', function (req, res, next) {
	res.send('order');
});

/*
/kitchen =>
Shows a list of all pending orders.
A completed button beside each order that tells the server the order is complete. Clicking this should remove the order from the list of orders without refreshing the page.
*/

router.get('/kitchen', function (req, res, next){
	
	res.send('kitchen');

});

// router.get('/', function (req, res, next){
// 	res.render('home', {message: "Welcome to Cats!", 
// 		links: [{
// 				text: 'Create a New Cat',
// 			 	link: '/cats/new',
// 			}, {
// 				text: 'See Your Cats',
// 			 	link:'/cats'
// 			}, {
// 				text: 'Get all Cats with Random Color',
// 				link: (function () {
// 					randomColorInt = Math.floor(Math.random() * (catOptions.colors.length));
// 					randomColor = catOptions.colors[randomColorInt];
// 					return 'cats/bycolor/' + randomColor}),
// 			}, {
// 				text: 'Delete Your Oldest Cat',
// 				link: 'cats/delete/old',
// 			}]})

// })



module.exports = router;
