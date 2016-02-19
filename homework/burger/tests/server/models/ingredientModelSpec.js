require('./../../../app'); // to connect to the database
// Setup our assertion library
var expect = require('chai').expect;

var Ingredient = require('./../../../models/ingredientModel');

describe('Ingredient Model', function() {
	/*
		Removing all the old things from the database so we always
		have only known ingredients in the database
	*/
	it('should remove all ingredients', function(done) {
		Ingredient.remove(function(err) {
      if (err) {
        return done(err);
      }
      done();
    });
	});

	it('should create a new ingredient', function(done) {
		
		var ingredient = new Ingredient({
			name: 'Cheese',
			price: 10,
			instock: true,
		});

		ingredient.save(function(err){
			if (err){
				return done(err);
			} else {
				done();
			}
		});
	});

	//TODO: test find by id?

});