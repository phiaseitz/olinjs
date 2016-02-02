//This type of file is usually found in app/models/robotModel.js
var mongoose = require('mongoose');

// Create a Schema
var ingredientSchema = mongoose.Schema({
  name: String,
  price: Number,
  inStock: Boolean,
});

module.exports = mongoose.model('ingredient', ingredientSchema);