var User = require('../models/userModel');
var twote = require('../models/twoteModel');
var mongoose = require('mongoose');
var passport = require('passport');

var routes = {};

routes.home = function (req, res, next) {
	console.log(req.session);

	User.find({}, 
		function(err, users){

			var cleanedUsers = users.map(function(user){
				return user.convertToDispJson();
			});

			twote.find({})
				.sort({_id: "desc"})
				.populate('user')
				.exec(function(err, twotes){
					console.log(twotes)
					// Your code fails here as there are no initial twotes present to be mapped. By adding the this if statement
					// I am able to circumvent it and access "/login" however I can't login 
					if (twotes){
						console.log("HERE", twotes)
						var cleanedTwotes	= twotes.map(function(twote){
							//Clearly, recleaning the user json every time isn't the best way to go about this. Fix this if I have time. 
							var cleanedTwote = {
								_id: twote._id,
								text: twote.text,
								user: twote.user.convertToDispJson()
							};
							// twote.user = twote.user;
							return cleanedTwote;
						});
					}

					if (req.session.passport && req.session.passport.user){

						passport.deserializeUser(req.session.passport.user, function(err, user){
							// cleanedTwotes seems to be undefined, therefore, I will comment out the following piece
							// of code since the app won't run on my machine. In doing so things work :)
							console.log("cleaned", cleanedTwotes)

							// var flaggedTwotes = cleanedTwotes.map(function(twote){
							// 	if (String(user._id) === String(twote.user._id)){
							// 		twote.isCurrentUser = 1;
							// 	} 	
							// 	return twote
							// })

							var cleanedUser = user.convertToDispJson();

							// passigin in twotes instead of cleanedTwotes to render the index hbs layout
							res.render('index', {
								user: cleanedUser,
								twotes: twotes,
								users: cleanedUsers,
							});

						})						
					} else {
						res.redirect('/login');
					}
				}
			)
		}
	)
}

routes.newTwote = function (req, res, next) {

	twote({
		user: mongoose.Types.ObjectId(req.session.passport.user),
		text: req.body.text,
	})
	.save(function(err, newTwote){
		passport.deserializeUser(req.session.passport.user, function(err, user){
			user.twotes.push(newTwote._id);
			user.save(function(err, savedUser){
				res.send({twote: newTwote, user: savedUser.convertToDispJson()});
			})
			
		})	
	})
}

routes.login = function(req, res, next){
	res.render('login');
}

routes.register = function(req, res, next){
	res.render('register');
}

routes.deleteTwote = function(req, res, next){
	twote.findById(mongoose.Types.ObjectId(req.body.id), function(err, twotes){
		twotes.remove();
		if (err) return console.error(err);
		res.send(twotes);
	})
}

module.exports = routes;
