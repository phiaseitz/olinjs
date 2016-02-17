require('./../../../app'); // to connect to the database
// Setup our assertion library
var expect = require('chai').expect;

var Order = require('./../../../models/orderModel');

describe('Order Model', function() {
	it('should remove all orders', function(done) {
		Order.remove({}, function(err) {
      if (err) {
        return done(err);
      }
	     done();
	  });
	});
	
	it('should create a new order', function(done) {
		
		var order = new Order({
			ingredients: [],
			price: 10,
			completed: false
		});

		order.save(function(err){
			if (err){
				return done(err);
			} else {
				done();
			}
		});
	});

	


});