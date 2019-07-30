// Routing for the Admin account creation

// Michael Fielder

// -----------------------------------------------------------------------------
// ** IMPORTS **
// -----------------------------------------------------------------------------
var express    = require('express');
var router     = express.Router();
var config     = require('../Config');
var mysql      = require('mysql');           // Used for MySQL queries
var bodyParser = require('body-parser');     // Used for getting request values
var bcrypt     = require('bcrypt');          // Used for encrypting passwords

var app = express();

// -----------------------------------------------------------------------------
// ** MIDDLEWARE **
// -----------------------------------------------------------------------------

// Connection information for the database
var connection = mysql.createConnection({
  host     : config.db.host,
  user     : config.db.user,
  password : config.db.password,
  database : config.db.database,
  multipleStatements: true
});

// Connects to the database and returns an error if it doesn't
connection.connect((err) => {
  if(err) throw err;
console.log('MySQL Connected AccountAPI');
});

// Body Parser
app.use(bodyParser.json());                        // Supports JSON encoded bodies
app.use(bodyParser.urlencoded({extended : true})); // Supports encoded bodies

// -----------------------------------------------------------------------------
// ** ROUTE **
// -----------------------------------------------------------------------------

router.post('/CreateAccount', function(req, res, next) {
  var pass = req.body.password
  var email = req.body.email
  var VID = req.body.VID
  var fname= req.body.fname
  var lname= req.body.lname
  if(!req.body.email || !req.body.password || !req.body.VID || !req.body.fname || !req.body.lname)
    res.send("CreateAccount Missing Parameters");
  else
    res.redirect(307, '/API/Accounts/Admin/CreateAccount/emailCheck');
});

router.post('/CreateAccount/emailCheck', function(req, res, next) {
  var pass = req.body.password
  var email = req.body.email
  var VID = req.body.VID
  var fname= req.body.fname
  var lname= req.body.lname
  connection.query('SELECT count(1) AS emailCheck FROM Admin WHERE email = ?', [req.body.email] , function (error, results, fields) {
      if (error) throw error;
      if (results[0].emailCheck != 0){
         //res.redirect(307, '/API/Accounts/Admin/CreateAccount/passCheck');
         res.redirect(307, '/API/Accounts/Admin/CreateAccount/exists');
      }
      else
        res.redirect(307, '/API/Accounts/Admin/CreateAccount/insertPerson');
  });
});

router.post('/CreateAccount/insertPerson', function(req, res, next) {
  var pass = req.body.password
  var email = req.body.email
  var VID = req.body.VID
  var fname= req.body.fname
  var lname= req.body.lname
  bcrypt.hash(req.body.password, config.hashing.saltRounds, function(err, hash) {
	if(err) throw error;
    connection.query('INSERT INTO Admin (Venue_VID, email, firstName, lastName) VALUES (?,?,?,?); INSERT INTO Admin_Password (Admin_AID, password) VALUES (LAST_INSERT_ID(),?);', [VID, email, fname, lname, hash] , function (error, results, fields) {if (error) throw error;});
    res.redirect('/');
  });
});

router.post('/CreateAccount/Exists', function(req, res, next) {
    res.send("User Account Exists");
});

router.post('/Login', function(req, res, next) {
    var email = req.body.email;
    var pass = req.body.password;
    connection.query('SELECT count(1) AS emailCheck FROM Admin WHERE email = ?', [email] , function (error, results, fields) {
      if (error) throw error;
      if (results[0].emailCheck != 0){
        connection.query('SELECT Admin_Password.password, Admin.AID FROM Admin_Password, Admin WHERE Admin.email = ? AND Admin.AID = Admin_Password.Admin_AID', [email] , function (error, results, fields) {
          if (error) throw error;
          let aid = results[0].AID;
          bcrypt.compare(req.body.password, results[0].password, (err, compare) => {
            if(!compare) res.json({"err":"2", "AID": "0"});
	    else res.json({"err": "0", "AID" : aid});
          });
        });
    }
    else{
      res.json({"err":"1", "AID": "0"});
    }
  });
});

module.exports = router;
