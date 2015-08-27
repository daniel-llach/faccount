var url = require('url')
var jwt = require('jwt-simple');
var mysql = require('mysql');
var bcrypt = require('bcrypt');
var config = require('./../config');

// DB connect
var connection = mysql.createConnection({
 host     : config.host,
 user     : config.user,
 password : config.password,
 database : config.database
});

module.exports = function(req, res, next){
	// Parse the URL, we might need this
	var parsed_url = url.parse(req.url, true)
	// Crypt password
	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(req.body.password, salt, function(err, pass) {
	        // Store hash in your password DB.
					connection.query('INSERT INTO `darwined_siglo21_planner_scenarios`.`usuarios` (`id`, `username`, `password`, `nombre`, `apellidos`, `rol_id`) VALUES (NULL, "' + req.body.username + '", "' + pass + '", "' + req.body.nombre + '", "' + req.body.apellidos + '", "' + req.body.rol + '")'), function(err, user) {
						if (!err) {
				      return next()
				    }else{
							console.log("Error: ", err);
						}
					}
					return next()
	    });
	});

}
