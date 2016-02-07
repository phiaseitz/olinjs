var ingredientModel = require('../models/ingredientModel');
var orderModel = require('../models/orderModel');

var mongoose = require('mongoose');

var routes = {}
/*
/ingredients =>
Shows a list of current ingredients (Name and Price) with Out-of-Stock and edit button.
An Add button should allow the user to specify the name and price of a new ingredient which should appear on the page without requiring a refresh.
Out-of-Stock button will tell the server to label the ingredient as disabled. The ingredient should be removed from the current page without refreshing. (Optional: make it toggleable to "add" more of the ingredient. In this case, do not remove the ingredient from the page, but make note through words or style that it is unavailable.)
Edit button allows the user to submit a new name or price for the ingredient which the server will update. The edits should change the ingredient list without refreshing.*/

routes.order = function (req, res, next) {
	ingredientModel.find()
		.exec(function (err, allIngredients) {
		  if (err) return console.error(err);
		 	 res.render('order', {ingredients: allIngredients});
		});
}

routes.addOrder = function (req, res, next){
	var ingredients = req.body['ingredients[]'].map(function(id){
		return mongoose.Types.ObjectId(id);
	});
	orderModel(
		{ 
			price: req.body.price,
			ingredients: ingredients,
			completed: false,
		})
		.save(function (err, newOrder){
			res.send(newOrder);
	});
}


module.exports = routes;
