// -----------------------------------------------------------------------------
// ** IMPORTS **
// -----------------------------------------------------------------------------
var express    = require("express");
var router     = express.Router();
var config     = require('./Config');
var mysql      = require('mysql');
var bodyParser = require('body-parser');

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
  console.log('MySQL Connected ViewsAPI');
});

// Body Parser
app.use(bodyParser.json());                        // Supports JSON encoded bodies
app.use(bodyParser.urlencoded({extended : true})); // Supports encoded bodies

// -----------------------------------------------------------------------------
// ** ROUTE **
// -----------------------------------------------------------------------------

//Respond to a GET request from client side
//Selects all data from client where CID matches CID from stall.
router.post('/ActiveClients', function (req, res) {
    connection.query("SELECT C.CID, C.stallName, C.email, C.accountDue, C.firstName, C.lastName, C.present, C.securityQuestion, C.securityAnswer FROM Client C, Stall S WHERE C.CID = S.Client_CID", function(err, result)
    {
        if(err) throw err;
        else{
            res.json(result);   //sends result as a json object
        }
    });
  });

//Respond to a GET request from client side
router.post('/Clients', function (req, res) {
    connection.query("SELECT * FROM Client", function(err, result)
    {
        if(err) throw err;
        else{
            res.json(result);   //sends result as a json object
        }
    });
  });

router.post('/Client', function (req, res) {
  connection.query("SELECT C.CID, C.stallName as storeName, C.firstName, C.lastName, C.present FROM Client C WHERE C.CID = ?;", [req.body.CID] ,function(err, client)
  {
      if(err) throw err;
      else{

        connection.query("SELECT T.tagName FROM `Client` C, Client_has_Tag CT, Tag T WHERE CT.Client_CID = C.CID AND CT.Tag_TID = T.TID AND C.CID = ?;", [req.body.CID] ,function(err, tags)
        {
            if(err) throw err;
            else{

              connection.query("SELECT S.stallName as venueStall, S.verified, S.SID FROM Stall S, Client C WHERE C.CID = S.Client_CID AND C.CID = ?;", [req.body.CID] ,function(err, stall)
              {
                  if(err) throw err;
                  else{
                      results = 
                      res.json({client, stall, tags});   //sends result as a json object
                  }
              });
              
            }
        });
        
      }
  });
});


router.post('/Requests', function (req, res) {
    connection.query("SELECT * FROM Request WHERE status != 2", function(err, result)
    {
        if(err) throw err;
        else{
            res.json(result);   //sends result as a json object
        }
    });
  });


  router.post('/Stalls', function (req, res) {
      connection.query("SELECT * FROM Stall", function(err, result)
      {
          if(err) throw err;
          else{
              res.json(result);   //sends result as a json object
          }
      });
    });

  router.post('/VerifyInfo', function (req, res) {
      connection.query("SELECT S.stallName as stall, S.verified, S.SID, C.CID, C.stallName, C.firstName, C.lastName, C.present FROM Stall S, Client C WHERE C.CID = S.Client_CID", function(err, result)
      {
          if(err) throw err;
          else{
              res.json(result);   //sends result as a json object
          }
      });
    });

router.post('/Tags', function (req, res) {
  connection.query("SELECT tagName FROM Tag T, Stall S, Client C WHERE S.Venue_VID = T.Venue_VID AND S.Client_CID = C.CID AND C.CID = ?;", [req.body.CID] ,function(err, result3)
  {
      if(err) throw err;
      else{
          res.json(result);   //sends result as a json object
      }
  });
});

module.exports = router;
