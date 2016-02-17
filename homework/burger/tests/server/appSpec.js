// Setup our assertion library
var expect = require('chai').expect;
var request = require('supertest');
var app = require('./../../app.js');


var ingredients = require('../../routes/ingredients');
var kitchen = require('../../routes/kitchen');
var order = require('../../routes/order')

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

	it('should return 200 OK on GET /kitchen', function(done) {
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

  it('should return 200 OK on GET /order', function(done) {
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
});