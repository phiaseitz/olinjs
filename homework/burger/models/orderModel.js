//This type of file is usually found in app/models/robotModel.js
var mongoose = require('mongoose');

// Create a Schema
var orderSchema = mongoose.Schema({
	ingredients: [{type: mongoose.Schema.Types.ObjectId, ref: 'ingredient'}],
	price: Number,
	completed: Boolean,
});

module.exports = mongoose.model('order', orderSchema);