var mongoose = require('mongoose');

// Create a Schema
var twote = mongoose.Schema({
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
  text: String,
});

module.exports = mongoose.model('twote', twote);