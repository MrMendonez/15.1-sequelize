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

//Serve static content for the app from the "public" directory in the application directory.
app.use("/static", express.static("public"));

