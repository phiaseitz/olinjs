var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session')
var bodyParser = require('body-parser');
var exphbs  = require('express-handlebars');

var index = require('./routes/index');

var favicon = require('serve-favicon');

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connected!');
});


var app = express();
app.use(favicon(path.join(__dirname,'public','images','favicon.png')));

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session({secret: '1234567890QWERTY'}));
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', index.home);
app.get('/home', index.home);
// app.post('/home', index.homeLoggedIn);
app.get('/login', index.login);
app.post('/signIn', index.signIn);
app.post('/newTwote', index.newTwote);
app.post('/deleteTwote', index.deleteTwote);
app.listen(3000);
