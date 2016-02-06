var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs  = require('express-handlebars');
var index = require('./routes/index');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/cats');
// I usually just use 'mongodb://localhost/test' -- it's okay to have collections
// related to multiple apps in the same database, and that way I don't have a ton of
// databases on my machine (I think this saves a bit of space)
// Up to you, though!


var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connected!');
});
// ^ This looks great -- exactly the place to do your mongo connecting.
// Can you think of things you might want to do in the db.once('open', ...) callback?


var app = express();
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

/*
All of this is "middleware" -- a stack of actions every request flows through on its
way to your routing logic.

Here's what's going on:
- The logger middleware prints information about the request to your terminal window --
you've probably seen "GET 200" messages (or similar) while running your app.
- The body parser middleware parses the body portion of a request stream out and places
in req.body so it's easier for you to interface with.
- The cookie parser does something similar, but for cookies -- it hasn't been useful
yet, but we'll talk about cookies soon!
- The path.join line lets you request things in '/public' as if they're in `/`.

We'll explore some more middleware soon, and you can even write your own if you want!
*/
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


/*
Your routing looks a little suspect to me -- looks like you're mixing the Express router
way of doing things (that's how your index.js file is set up) and the non-Express router
way of doing things, e.g. app.get('/', index.home)

If you want to use the Express router (which I think is a great idea!) all you have to
do here in this case is app.use('/', index)

The Express router is middleware-based (added a comment about middleware above all of the
app.use statements above) -- the app.use('/', index) line means the routing middleware will
intercept requests with paths starting with '/' (that's all of them) and direct them to index
to be routed further.

The isItChristmas sample solution app is a good example of using the express router, and
the expressintro sample app is a good example of not using the express router. (both in Class 3)
*/
app.get('/', index);
app.get('/cats/new', index);
app.get('/cats', index);
app.get('/cats/bycolor/:color', index);
app.get('/cats/delete/old', index);
app.get('/cats/bycolors/:color1/:color2', index);

app.listen(3000);
