var mongoose = require('mongoose');


// Create a Schema
var twote = mongoose.Schema({
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
  text: String,
});

twote.pre('remove', function(next) {
    // Remove all the assignment docs that reference the removed person.
    this.model('user').update({twotes: this._id}, {$pull: {twotes: this._id}}, next);
});

module.exports = mongoose.model('twote', twote);