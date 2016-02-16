// Create an express / handlebars / node.js / mysql app with 3 views
// Register - don't let someone with the same email register twice
// The registration should have a first name and last name
// Login
// Secret Page
// On the secret page, display the first and last name of the user
// Only an authenticated user can see the secret page (remember sessions and middleware?)

var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var exphbs = require('express-handlebars');
var PORT = process.env.NODE_ENV || 8000;
var app = express();

var connection = mysql.createConnection({
  port: 3306,
  host: 'localhost',
  user: 'root',
  database: 'rcb_authentication_db'
});

//Serve static content for the app from the "public" directory in the application directory.
app.use("/static", express.static("public"));

// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({
  extended: false
}));

app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

app.get('/', function(req, res) {
  res.render('register');
});

app.get('/login', function(req, res) {
  res.render('login');
});

app.get('/secret', function(req, res) {
  res.render('secret');
});

app.get('/*', function(req, res) {
  res.render('/');
});

app.listen(PORT, function(){
  console.log('Listening on %s', PORT)
});