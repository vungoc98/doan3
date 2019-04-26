const express = require("express");
const jsonParser = require("body-parser").json();
const mysql = require("mysql"); 
const sessionStorage = require('node-sessionstorage');
 
var session = require("express-session");
var cookieParser = require('cookie-parser');
var app = express();
 
// Ket noi nodejs voi mysql
var con = mysql.createConnection({
	database: 'sql12287863',
	host:  'sql12.freemysqlhosting.net',
	user: 'sql12287863',
	password: 'cQ4ERTAMTQ'
});

con.connect(function(err) {
	if (err) {
		console.log("error");
	}
	else 
		console.log("Connected");
});
app.listen(3000);
 