var ingredientModel = require('../models/ingredientModel');
var orderModel = require('../models/orderModel');
var Promise = require('es6-promise').Promise;

var routes = {}
/*
/ingredients =>
Shows a list of current ingredients (Name and Price) with Out-of-Stock and edit button.
An Add button should allow the user to specify the name and price of a new ingredient which should appear on the page without requiring a refresh.
Out-of-Stock button will tell the server to label the ingredient as disabled. The ingredient should be removed from the current page without refreshing. (Optional: make it toggleable to "add" more of the ingredient. In this case, do not remove the ingredient from the page, but make note through words or style that it is unavailable.)
Edit button allows the user to submit a new name or price for the ingredient which the server will update. The edits should change the ingredient list without refreshing.*/

routes.kitchen = function (req, res, next) {
	orderModel.find({completed: false})
		.populate('ingredients')
		.exec(function (err, allOrders) {
		  if (err) return console.error(err);
		  console.log(allOrders);
		  res.render('kitchen', {orders: allOrders});
		 });
}

routes.completeOrder = function (req, res, next){
	orderModel.findById(req.body.mongoId, 
		function (err, order){
			order.completed = true;

			order.save(function (err, finishedOrder){
				if (err) return console.error(err);
				res.send(finishedOrder);
			})
		}
	);
}


module.exports = routes;
