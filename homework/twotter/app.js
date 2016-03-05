var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session')
var bodyParser = require('body-parser');
var exphbs  = require('express-handlebars');
var flash    = require('connect-flash');



var passport = require('passport');
var localAuth = require('./localAuthentication');
var fbAuth = require('./fbAuthentication');
var User = require('./models/userModel');


var index = require('./routes/index');
var userAuth = require('./routes/userauth');


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
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


// On refresh it seems like the twotes are "lost" and not populating the page
app.get('/', index.home);
app.get('/home', index.home);
app.get('/login', index.login);
app.get('/register', index.register);
// app.post('/signIn', index.signIn);
app.post('/newTwote', index.newTwote);
app.post('/deleteTwote', index.deleteTwote);

app.get('/auth/facebook',
  passport.authenticate('facebook'),
  function(req, res){});

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/' }),userAuth.facebookCallback);

app.get('/logout', userAuth.logout);

app.post('/register', userAuth.register);

app.post('/signup', userAuth.signup);
app.get('/signup', userAuth.signup);

app.post('/login', userAuth.localLogin);


app.listen(3000);
