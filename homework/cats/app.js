var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs  = require('express-handlebars');
var index = require('./routes/index');

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


app.get('/', index);
app.get('/cats/new', index);
app.get('/cats', index);
app.get('/cats/bycolor/:color', index);
app.get('/cats/delete/old', index);
app.get('/cats/bycolors/:color1/:color2', index);

app.listen(3000);
