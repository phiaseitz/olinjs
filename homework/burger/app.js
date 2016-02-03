var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs  = require('express-handlebars');
var ingredients = require('./routes/ingredients');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/cats');


var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connected!');
});


var app = express();
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// app.get('/', ingredients);
app.get('/ingredients', ingredients);
// app.get('/order', ingredients);
// app.get('/kitchen', ingredients);
app.post('/setOutOfStock', ingredients);
app.post('/editIngredient', ingredients)
app.post('/addIngredient', ingredients);
app.post('/updateIngredients', ingredients);

app.listen(3000);
