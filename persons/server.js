// Create an app that let's you create "persons" using Sequelize / handlebars / node.js / mysql / express / bootstrap.css

var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var exphbs = require('express-handlebars');
var PORT = process.env.NODE_ENV || 8000;
var app = express();
var session = require('express-session');
var Sequelize = require('sequelize');

var sequelize = new Sequelize('persons_db', 'root');

var User = sequelize.define('User', {
  firstname: Sequelize.STRING,
  lastname: Sequelize.STRING

});

//Serve static content for the app from the "public" directory in the application directory.
app.use("/static", express.static("public"));

// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(session({
  secret: 'elm i 8lsdjfklsjflkjsdfjsd',
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 14
  },
  saveUninitialized: true,
  resave: false
}));

app.get('/', function(req, res) {
  res.render('index', {
    msg: req.query.msg
  });
});

app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

app.post('/register', function(req, res) {
  User.create(req.body).then(function(user) { // Creating db table
    // req.session.authenticated = user;
    console.log(req.body);
    res.redirect('/success');
  }).catch(function(err) {
    res.redirect('/?msg=' + err.message);
  });
});

app.post('/login', function(req, res) {
  var firstname = req.body.firstname;
  var lastname = req.body.lastname;

  User.findOne({
    where: {
      firstname: firstname,
      lastname: lastname
    }
  }).then(function(user) {
    if(user) {
      req.session.authenticated = user;
      res.redirect('/success');
    } else {
      res.redirect('/?msg=You failed at life');
    }
  }).catch(function(err) {
    throw err;
  });
});

app.get('/success', function(req, res, next) {
  if(req.session.authenticated) {
    next();
  } else {
    res.redirect("/?msg=Must be authed");
  }
}, function(req, res) {
  res.send('YOU GOT IT! ' + req.session.authenticated.firstname);
});

sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("LISTNEING!");
  });
});