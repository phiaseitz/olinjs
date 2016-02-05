var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs  = require('express-handlebars');

var ingredients = require('./routes/ingredients');
var order = require('./routes/order');
var kitchen = require('./routes/kitchen');
var favicon = require('serve-favicon');



var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/burgers');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connected!');
});


var app = express();
app.use(favicon(path.join(__dirname,'public','images','burger.png')));

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.get('/ingredients', ingredients.ingredients);
app.post('/toggleIngredientStock', ingredients.toggleIngredientStock);
app.post('/editIngredient', ingredients.editIngredient)
app.post('/addIngredient', ingredients.addIngredient);
app.post('/updateIngredients', ingredients.updateIngredients);

app.get('/order', order.order);
app.post('/addOrder', order.addOrder);

app.get('/kitchen', kitchen.kitchen);
app.post('/completeOrder', kitchen.completeOrder);

app.listen(3000);
