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
  if(!req.body.email || !req.body.password)
    res.send("CreateAccount Missing Parameters");
  else
    res.redirect(307, '/API/Accounts/Admin/CreateAccount/emailCheck');
});

router.post('/CreateAccount/emailCheck', function(req, res, next) {
  var pass = req.body.password
  var email = req.body.email
  var VID = req.body.VID
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
  bcrypt.hash(req.body.password, config.hashing.saltRounds, function(err, hash) {
	if(err) throw error;
    connection.query('INSERT INTO Admin (Venue_VID, email) VALUES (?,?); INSERT INTO Admin_Password (Admin_AID, password) VALUES (LAST_INSERT_ID(),?);', [VID, email, hash] , function (error, results, fields) {if (error) throw error;});
    res.redirect('/');
  });
});

router.post('/CreateAccount/Exists', function(req, res, next) {
    res.send("User Account Exists");
});

router.post('/Login', function(req, res, next) {
    var email = req.body.email;
    var pass = req.body.Password;
    connection.query('SELECT count(1) AS emailCheck FROM Admin WHERE email = ?', [email] , function (error, results, fields) {
      if (error) throw error;
      if (results[0].emailCheck != 0){
        connection.query('SELECT Admin_Password.password, Admin.AID FROM Admin_Password, Admin WHERE Admin.email = ? AND Admin.AID = Admin_Password.Admin_AID', [email] , function (error, results, fields) {
          if (error) throw error;
          let aid = results[0].AID;
          bcrypt.compare(req.body.password, results[0].password, (err, compare) => {
            if(!compare) res.send("Invalid password, please try again");
            req.session.name     = aid;
            req.session.isAdmin = false;
            res.send("Password Accepted");
          });
        });
    }
    else{
      res.send("This account does not exist, please create an account!");
    }
  });
});

// router.post('/CreateAccount/passCheck', function(req, res, next) {
//   var pass = req.body.password
//   var email = req.body.email
//   connection.query('SELECT pass AS passCheck FROM person WHERE email = ?', [req.body.email] , function (error, results, fields) {
//     if (error) throw error;
//     if (results[0].passCheck == 'null')
//       //res.redirect(307, '/API/Accounts/Admin/updatePass');
//       res.redirect(307, '/API/Accounts/Admin/CreateAccount/exists');
//     else{
//       res.redirect(307, '/API/Accounts/Admin/CreateAccount/exists');
//     }
//   });
// });
//
// router.post('/updatePass', function(req, res, next) {
//   var pass = req.body.password
//   var email = req.body.email
//     sql.query('UPDATE person SET pass = ? WHERE email = ?', [pass, email] , function (error, results, fields) {if (error) throw error;});
//     transporter.sendMail({from: '4710team8@gmail.com',
//       to: email,
//       subject: 'Survey Time: Please verify your accounts email adderess',
//       text: 'Please follow this link to verify your accounts email adderess: http://localhost:3000/createAccount/verify?Email='+email+'&SuperSecretWord=WOLVERINES'}, function(error, info){
//       if (error) {console.log(error);} else {console.log('Email sent: ' + info.response);}
//     });
//     res.redirect('/');
// });

module.exports = router;
