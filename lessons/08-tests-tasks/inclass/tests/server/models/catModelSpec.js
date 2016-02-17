require('./../../../app'); // to connect to the database
var expect = require('chai').expect;
var Cat = require('./../../../models/catModel');

describe('Cat Model', function() {
  it('should create a new cat', function(done) {
    var cat = new Cat({
      name: 'Fluffy',
      colors: ['orange', 'white'],
      age: 11
    });
    cat.save(function(err) {
      if (err) {
        return done(err);
      }
      done();
    });
  });

  it('should return the correct cat', function(done){
    Cat.find({name: 'Fluffy'},function(err, cat){

      if (err){
        return done(err);
      } else if(cat[0].name ===  'Fluffy' && 
          cat[0].colors === ['orange', 'white']) 
      {
        return done();
      } else {
        return done("Returned wrong cat: " + cat);
      }
    done();
    });
  });

  // What else can you test?

  it('should remove a cat by name', function(done) {
    Cat.remove({ name: 'Fluffy' }, function(err) {
      if (err) {
        return done(err);
      }
      done();
    });
  });


});
