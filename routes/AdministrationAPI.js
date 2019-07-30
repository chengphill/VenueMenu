// -----------------------------------------------------------------------------
// ** IMPORTS **
// -----------------------------------------------------------------------------
var express    = require("express");
var router     = express.Router();
var config     = require('./Config');
var mysql      = require("mysql");
var bodyParser = require("body-parser");

var app = express();

// -----------------------------------------------------------------------------
// ** MIDDLEWARE **
// -----------------------------------------------------------------------------

// Connection information for the database
var connection = mysql.createConnection({
  host     : config.db.host,
  user     : config.db.user,
  password : config.db.password,
  database : config.db.database
});

//attempt to connect to db
connection.connect((err) => {
  if(err) throw err;
  console.log('MySQL Connected AdministrationAPI');
});

// Body Parser
app.use(bodyParser.json());                        // Supports JSON encoded bodies
app.use(bodyParser.urlencoded({extended : true})); // Supports encoded bodies

// -----------------------------------------------------------------------------
// ** ROUTE **
// -----------------------------------------------------------------------------


router.post("/signIn", function(req, res) {

    var isPresent = "UPDATE Client SET present = '1' WHERE CID = ?";

    connection.query(isPresent, [req.body.CID], function (err, result) {
        if (err) throw err;
        else res.send("Signed in");
    })
});

router.post("/signOut", function(req, res) {

    var toSignOut = "UPDATE Client SET present = '0' WHERE CID = ?";

    connection.query(toSignOut, [req.body.CID], function (err, result) {
      if (err) throw err;
      else res.send("Signed out");
    })
});

router.post("/resetAttendance", function(req, res) {

  var resetPresent = "UPDATE Client SET present = '0' ";

  connection.query(resetPresent, function (err, result) {
      if (err) throw err;
      else res.send("All client attendance is reset");
  });
});

//set verify to 1 for stall verification
//using the stallname
  
router.post("/Verify", function(req, res) {
	console.log(req.body.CID);
      var isVerified = "UPDATE Stall, `Client`, Venue SET Stall.Verified = 1 WHERE `Client`.CID = ? AND `Client`.CID = Stall.Client_CID AND Venue_VID = ?;"
      var clientPresent = "SELECT present FROM Client WHERE CID = ?";
      var isPresent = 0; //client not checked in default value 0

      connection.query(clientPresent, [req.body.CID], function (err, result2) {
          if (err) throw err;
          else{
          //get present value of client: 0 or 1. 1 is present
            isPresent = parseInt(result2[0].present,10);
            if (isPresent == 1){
                //is verified so update verify to 1 in stall
                //connection.query(isVerified, [req.body.CID, req.body.VID], function (err, result) {
                  connection.query(isVerified, [req.body.CID, 1], function (err, result) {
                    if (err) throw err;
                    res.send("1");
                    })
            }
            else{
                //return an error to user client not checked in
                res.send("0");
          }
        }
      });
  });

router.post("/ReqError", function(req, res) {
  res.send(req.body);
});

  router.post("/unVerifyStall", function(req, res) {

      var unVerify = "UPDATE Stall SET verify = '0' WHERE SID = ?";

      connection.query(unVerify, [req.body.SID], function (err, result) {
      if (err) throw err;
      //console.log(`Changed ${result.changedRows} row(s)`);
      res.send('Stall is unverified');
      })
  });

  router.post("/resetVerification", function(req, res) {

      var resetVerification = "UPDATE Stall SET verify = 0";

      connection.query(resetVerification, function (err, result) {
      if (err) throw err;
      else res.send("All stall verifications are reset");
      })
  });

module.exports = router;
