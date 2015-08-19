var url = require('url')
var jwt = require('jwt-simple');
var mysql = require('mysql');
var bcrypt = require('bcrypt');

// DB connect
var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : '',
	database : 'darwined_siglo21_planner_scenarios'
});

module.exports = function(req, res, next){

	// Parse the URL, we might need this
	var parsed_url = url.parse(req.url, true)
	// var pass = bcrypt.hash()

  console.log("req: ", req.body);
	connection.query('INSERT INTO `darwined_siglo21_planner_scenarios`.`usuarios` (`id`, `username`, `password`, `nombre`, `apellidos`, `rol_id`) VALUES (NULL, "' + req.body.username + '", "' + req.body.password + '", "' + req.body.nombre + '", "' + req.body.apellidos + '", "' + req.body.rol + '")'), function(err, user) {
		if (!err) {
      return next()
    }else{
			console.log("Error: ", err);
		}
	}
  //
  // connection.query('SELECT * FROM `usuarios` WHERE `id` = "' + decoded.iss + '"' , function(err, user) {
  //   if (!err) {
  //     req.user = user
  //     return next()
  //   }
  // });
	return next()
}
