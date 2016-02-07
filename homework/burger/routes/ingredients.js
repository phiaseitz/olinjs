var ingredientModel = require('../models/ingredientModel');

var routes = {};
/*
/ingredients =>
Shows a list of current ingredients (Name and Price) with Out-of-Stock and edit button.
An Add button should allow the user to specify the name and price of a new ingredient which should appear on the page without requiring a refresh.
Out-of-Stock button will tell the server to label the ingredient as disabled. The ingredient should be removed from the current page without refreshing. (Optional: make it toggleable to "add" more of the ingredient. In this case, do not remove the ingredient from the page, but make note through words or style that it is unavailable.)
Edit button allows the user to submit a new name or price for the ingredient which the server will update. The edits should change the ingredient list without refreshing.*/

routes.ingredients = function (req, res, next) {
	ingredientModel.find()
		.exec(function (err, allIngredients) {
		  if (err) return console.error(err);
		 	 res.render('ingredients', {ingredients: allIngredients});
		});
}

routes.addIngredient = function (req, res, next){
	var name = req.body.name;
	var price = req.body.price;
	
	ingredientModel(
		{
			name: name, 
			price: price,
			inStock: true,
		})
		.save(function (err, newIngredient){
			res.send(newIngredient);
	});
}

routes.toggleIngredientStock = function (req, res, next){

	ingredientModel.findById(req.body.mongoId, 
		function (err, ingredient){
			ingredient.inStock = !ingredient.inStock;
			
			ingredient.save(function (err, newIngredient){
				if (err) return console.error(err);
				res.send(newIngredient);
			})
		}
	);
	
}

routes.editIngredient = function (req, res, next){
	
	ingredientModel.findById(req.body.mongoId, 
		function (err, ingredient){
			ingredient.name = req.body.name;
			ingredient.price = req.body.price;

			ingredient.save(function (err, newIngredient){
				if (err) return console.error(err);
				res.send(newIngredient);
			})
		}
	);
}

module.exports = routes;
