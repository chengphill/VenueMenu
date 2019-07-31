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

router.post('/CreateAccount', createAccount);
router.post('/CreateAccount/emailCheck', emailCheck);
router.post('/CreateAccount/insertPerson', insertPerson);
router.post('/CreateAccount/Exists', exists);

function exists(req, res, next) {
    console.log("User Account Exists");
    res.send("User Account Exists");
}

function insertPerson(req, res, next) {
  var pass = req.body.password
  var email = req.body.email
  var VID = req.body.VID
  var fname= req.body.fname
  var lname= req.body.lname
  bcrypt.hash(req.body.password, config.hashing.saltRounds, function(err, hash) {
	if(err) throw error;
    connection.query('INSERT INTO Client (email, firstName, lastName) VALUES (?,?,?); INSERT INTO Client_Password (Client_CID, password) VALUES (LAST_INSERT_ID(),?);', [email, fname, lname, hash] , function (error, results, fields) {if (error) throw error;});
    console.log("Person Successfully Inserted");
    res.end();
  });
}

function emailCheck(req, res, next) {
  var pass = req.body.password
  var email = req.body.email
  var VID = req.body.VID
  var fname= req.body.fname
  var lname= req.body.lname
  connection.query('SELECT count(1) AS emailCheck FROM Client WHERE email = ?', [req.body.email] , function (error, results, fields) {
      if (error) throw error;
      if (results[0].emailCheck != 0){
         exists(req, res, next);
      }
      else
        insertPerson(req, res, next);
  });
}

function createAccount(req, res, next) {
  var pass = req.body.password
  var email = req.body.email
  var VID = req.body.VID
  var fname= req.body.fname
  var lname= req.body.lname
  if(!req.body.email || !req.body.password || !req.body.fname || !req.body.lname){
    console.log("CreateAccount Missing Parameters");
    res.send("CreateAccount Missing Parameters");
  }
  else
    emailCheck(req, res, next);
}

router.post('/Login', function(req, res, next) {
    var email = req.body.email;
    var pass = req.body.Password;
    connection.query('SELECT count(1) AS emailCheck FROM Client WHERE email = ?', [email] , function (error, results, fields) {
      if (error) throw error;
      if (results[0].emailCheck != 0){
        connection.query('SELECT Client_Password.password, Client.CID FROM Client_Password, Client WHERE Client.email = ? AND Client.CID = Client_Password.Client_CID', [email] , function (error, results, fields) {
          if (error) throw error;
          let cid = results[0].CID;
          bcrypt.compare(req.body.password, results[0].password, (err, compare) => {
            if(!compare) res.json({"err":"2", "AID": "0"});
            else res.json({"err": "0", "CID" : cid});
          });
        });
    }
    else{
      res.json({"err":"1", "CID": "0"});
    }
  });
});

module.exports = router;
