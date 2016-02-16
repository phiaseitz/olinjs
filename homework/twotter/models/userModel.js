var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// Create a Schema
var user = mongoose.Schema({
	twotes: [{type: mongoose.Schema.Types.ObjectId, ref: 'twote'}],
	local            : {
        username        : String,
        password     : String,
    },
    facebook         : {
        id           : String,
        token        : String,
        name         : String
    }
});

// methods ======================
// generating a hash
user.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
user.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

user.methods.convertToDispJson = function () {
	if (this.local.username){
		return {
			username: this.local.username,
			_id: this._id,
			twotes: this.twotes,
		};
	} else if (this.facebook.name) {
		return {
			username: this.facebook.name,
			_id: this._id,
			twotes: this.twotes,
		};
	} else {
		return {
			username: 'ERROR',
			_id: 'ERROR',
			twotes: [],
		};
	}
};

module.exports = mongoose.model('user', user);