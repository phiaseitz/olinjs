var user = require('../models/userModel');
var twote = require('../models/twoteModel');
var mongoose = require('mongoose');

var routes = {};
/*
/ingredients =>
Shows a list of current ingredients (Name and Price) with Out-of-Stock and edit button.
An Add button should allow the user to specify the name and price of a new ingredient which should appear on the page without requiring a refresh.
Out-of-Stock button will tell the server to label the ingredient as disabled. The ingredient should be removed from the current page without refreshing. (Optional: make it toggleable to "add" more of the ingredient. In this case, do not remove the ingredient from the page, but make note through words or style that it is unavailable.)
Edit button allows the user to submit a new name or price for the ingredient which the server will update. The edits should change the ingredient list without refreshing.*/

routes.home = function (req, res, next) {
	console.log(req.session);

	user.find({}, 
		function(err, users){
			twote.find({})
				.populate('user')
				.exec(function(err, twotes){
					if (req.session.user){
						res.render('index', {
							user: req.session.user,
							twotes: twotes,
							users: users,
						});
					} else {
						res.render('index', {
							twotes: twotes,
							users: users,
						});
					}
				}
			)
		}
	)
	
	
}

routes.newTwote = function (req, res, next) {
	console.log(req.body);
	twote({
		user: mongoose.Types.ObjectId(req.body.userId),
		text: req.body.text,
	})
	.save(function(err, newTwote){
		user.findById(mongoose.Types.ObjectId(req.body.userId),
			function (err, twoteUser){
				twoteUser.twotes.push(newTwote._id);
				twoteUser.save(function(err, savedUser){
					res.send({
						twote: newTwote,
						user: twoteUser
					});	
				})
			}
		)
	})
}

routes.login = function(req, res, next){
	res.render('login');
}

routes.signIn = function(req, res, next){
	user.find({username: req.body.username}, function (err, existingUser){
		if (err) return console.error(err);
		console.log(existingUser.length);
		if (existingUser.length < 1) {
			console.log('new user');
			user(
			{
				username: req.body.username, 
				twotes: [],
			})
			.save(function (err, newUser){
				req.session.user = newUser;
				res.redirect("/");
			});

		} else {
			console.log('exisiting user');
			req.session.user = existingUser[0];
			res.redirect("/");
		}
	})

}

module.exports = routes;
