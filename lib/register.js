var url = require('url')
var jwt = require('jwt-simple');
var mysql = require('mysql');
var bcrypt = require('bcrypt');
var config = require('./../config');

// DB connect
var connection = mysql.createConnection({
	host     : config.db_host,
	user     : config.db_user,
	password : config.db_password,
	database : config.db_database
});

module.exports = function(req, res, next){
	// Parse the URL, we might need this
	var parsed_url = url.parse(req.url, true)
	// Crypt password
	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(req.body.password, salt, function(err, pass) {
	        // Store hash in your password DB.
					connection.query('INSERT INTO `' + config.db_database + '`.`usuarios` (`id`, `username`, `password`, `nombre`, `apellidos`, `rol_id`, `cliente_id`) VALUES (NULL, "' + req.body.username + '", "' + pass + '", "' + req.body.nombre + '", "' + req.body.apellidos + '", "' + req.body.rol + '", "' + req.body.cliente + '")'), function(err, user) {
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
