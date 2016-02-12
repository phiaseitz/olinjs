var mongoose = require('mongoose');

// Create a Schema
var user = mongoose.Schema({
	twotes: [{type: mongoose.Schema.Types.ObjectId, ref: 'twote'}],
	username: String,
});

module.exports = mongoose.model('user', user);