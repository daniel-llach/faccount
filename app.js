/**
 * Load up the project dependencies
 */
var express = require('express');
var bodyParser = require('body-parser');
var colors = require('colors');
var url = require('url'); // req.body
var jwt = require('jwt-simple');
var config = require('./config');

/*
 * THe JWT middleware
 */
var jwtauth = require('./lib/jwtauth');

/*
 * Create Express app
 */
app = express();
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "origin, content-type, accept, username, password");
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

/*
 * Set the secret for encoding/decoding JWT tokens
 */
app.set('jwtTokenSecret', 'superdarwined')

/*
 * A simple middleware to restrict access to authenticated users.
 */
var requireAuth = function(req, res, next) {
	if (!req.user) {
		res.status(401).send('Not authorized');
	}	else {
		next();
	}
}

/*
 * Load up the controllers
 */
var controllers = require('./controllers')
controllers.set(app)

/*
 * Start listening
 */
var server = app.listen(80, function() {
	console.log('Foris account listening on port %d'.green, server.address().port)
});

/*
 * Protected routes
 */
app.get('/secret', jwtauth, requireAuth, function(req, res){
  res.json(req.user[0]); // pass the user data
})

/*
 * Unprotected routes
 */
 var register = require('./lib/register');
 app.post('/register', register, function(req, res){
  //  res.status(200).send('darwined login!');
  // redirect to app main page
  res.redirect(303, config.url_daccount + '/login');
 });
