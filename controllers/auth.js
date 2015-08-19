var express = require('express')
var bodyParser = require('body-parser')
var mysql = require('mysql');
var jwt = require('jwt-simple');
var moment = require('moment')
var bcrypt = require('bcrypt');

var dbconfig = require('./../db/config');
var connection = mysql.createConnection({
 host     : dbconfig.host,
 user     : dbconfig.user,
 password : dbconfig.password,
 database : dbconfig.database
});

module.exports.set = function(app) {

app.get('/token', function(req, res){
	if (req.headers.username && req.headers.password) {
		var user = req.headers.username;
		var pass = req.headers.password;

		connection.query('SELECT * FROM `usuarios` WHERE `username` = "' + user + '"' , function(err, userData) {
				if(!err){
					if(userData.length == 0){
						res.status(401).send('Authentication error: user cannot be found')
					}else{
						bcrypt.compare(pass, userData[0].password, function(err, response) {
								if (err) return next(err);
								if(response){
									console.log("response: ", response);
									// user has successfully authenticated, so we can generate and send a token
									var expires = moment().add('days', 7).valueOf();
									var token = jwt.encode(
										{
											iss: userData[0].id,
											exp: expires
										},
										app.get('jwtTokenSecret')
									);
									res.json({
										token: token,
										expires: expires
										// user: userData
									});
								}else{
									res.status(401).send('Authentication error: password is wrong')
								}
						});
					}
				}else{
					res.status(401).send(err)
				}
			});

		} else {
			// No username provided, or invalid POST request. For simplicity, just return a 401
			res.status(401).send('Authentication error: No username provided, or invalid POST request')
		}
	})

}
