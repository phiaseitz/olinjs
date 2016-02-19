// Setup our assertion library
var expect = require('chai').expect;
var request = require('supertest');
var app = require('./../../app.js');


var ingredients = require('../../routes/ingredients');
var kitchen = require('../../routes/kitchen');
var order = require('../../routes/order');

var addedIngredient;
var addedOrder;

// Sample tests
describe("The app", function() {
	it('should return 200 OK and correct html on GET /ingredients', function(done) {
    request(app)
      .get('/ingredients')
      .expect(200)
      .expect('Content-Type', 'text/html; charset=utf-8')
      .expect('Content-Length', '2534')
      .end(function(err, res) {
        // Supertest lets us end tests this way...
        // (useful if we want to check a couple more things with chai)
        if (err) {
          return done(err);
        }
        done();
      });
  });

	it('should return 200 OK and correct html on GET /kitchen', function(done) {
    request(app)
      .get('/kitchen')
      .expect(200)
      .expect('Content-Type', 'text/html; charset=utf-8')
      .expect('Content-Length', '808')
      .end(function(err, res) {
        // Supertest lets us end tests this way...
        // (useful if we want to check a couple more things with chai)
        if (err) {
          return done(err);
        }
        done();
      });
  });

  it('should return 200 OK and correct html on GET /order', function(done) {
    request(app)
      .get('/order')
      .expect(200)
      .expect('Content-Type', 'text/html; charset=utf-8')
      .expect('Content-Length', '920')
      .end(function(err, res) {
        // Supertest lets us end tests this way...
        // (useful if we want to check a couple more things with chai)
        if (err) {
          return done(err);
        }
        done();
      });
  });

  it('should return 404 on GET /notaroute', function(done) {
    request(app)
      .get('/notaroute')
      .expect(404, done);
  });

  it('should return the new ingredient on /addIngredient', function(done) {
    request(app)
      .post('/addIngredient')
      .send({name: "another ingredient", price: 10})
      .end(function(err, res) {
        var newIngred = JSON.parse(res.text);
        if (err) {
          return done(err);
        } else if (
          newIngred["name"] === "another ingredient" &&
          newIngred["price"] === 10 &&
          newIngred["inStock"] === true
        ) {
          addedIngredient = newIngred;
          done();
        } else {
          done(newIngred);
        }
      })
  });

  it('should return the ingreient with toggled stock status on /toggleIngredientStock', function(done) {
    request(app)
      .post('/toggleIngredientStock')
      .send({mongoId: addedIngredient._id})
      .end(function(err, res) {
        var ingredient = JSON.parse(res.text);
        if (err) {
          return done(err);
        } else if (
          addedIngredient.name === ingredient.name &&
          addedIngredient.price === ingredient.price &&
          addedIngredient.stock !== ingredient.inStock
        ) {
          done();
        } else {
          done("Wrong ingredient!");
        }
      })
  });

  it('should return the edited ingredient on /editIngredient', function(done) {
    request(app)
      .post('/addIngredient')
      .send({mongoId: addedIngredient._id, name: "changed ingredient", price: 12})
      .end(function(err, res) {
        ingredient = JSON.parse(res.text);
        if (err) {
          return done(err);
        } else if (
          ingredient.name === "changed ingredient" &&
          ingredient.price === 12 &&
          ingredient.inStock === addedIngredient.inStock
        ) {
          addedIngredient = ingredient;
          done();
        } else {
          done(ingredient);
        }
      })
  });

  it('should return the new order on /addOrder', function(done) {
    request(app)
      .post('/addOrder')
      .send({"ingredients[]": [addedIngredient._id], price: addedIngredient.price})
      .end(function(err, res) {
        var order = JSON.parse(res.text);
        if (err) {
          return done(err);
        } else if (
          order.price === addedIngredient.price &&
          order.ingredients.length === 1 &&
          order.ingredients[0] === addedIngredient._id &&
          order.completed === false
        ) {
          addedOrder = order;
          done();
        } else {
          done(order);
        }
      })
  });

  it('should complete the order on /completeOrder', function(done) {
    request(app)
      .post('/completeOrder')
      .send({mongoId: addedOrder._id})
      .end(function(err, res) {
        var order = JSON.parse(res.text);
        if (err) {
          return done(err);
        } else if (
          order.price === addedOrder.price &&
          order.ingredients.length === addedOrder.ingredients.length &&
          order.ingredients[0] === addedOrder.ingredients[0] &&
          order.completed === true
        ) {
          done();
        } else {
          done(order);
        }
      })
  });


  
});