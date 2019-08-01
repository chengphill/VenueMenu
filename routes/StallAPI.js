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
  console.log('MySQL Connected StallAPI');
});

// Body Parser
app.use(bodyParser.json());                        // Supports JSON encoded bodies
app.use(bodyParser.urlencoded({extended : true})); // Supports encoded bodies

// -----------------------------------------------------------------------------
// ** ROUTE **
// -----------------------------------------------------------------------------

router.post("/insert", insert);
router.post("/delete", deleteStall);
router.post("/edit", edit); 
router.post("/vacate", vacate);

function insertCont(req, res, next) {
  var sql = `INSERT INTO Stall (stallName, Venue_VID ) VALUES (?, ?)`;
  var updateVenue = "UPDATE Venue SET Stalls = Stalls + 1 WHERE VID = ?";
  connection.query(sql, [req.body.stallName, req.body.VID], function(err, data) {
    if(err) throw err;
    else {
      connection.query(updateVenue, [req.body.VID], function(err, data) {
      res.json({"err":"0"});
      });
    }
  });
}

function insert(req, res, next) {
  // get data from forms and add to the table called user..
  if (!req.body.stallName || !req.body.VID) res.json({"err": "1"})
  else insertCont(req,res,next);
}

function editCont(req, res, next) {
  // get data from forms and add to the table called user..

  var sql = `UPDATE Stall SET stallName = ? WHERE SID = ?`;
  
  connection.query(sql, [req.body.stallName, req.body.SID], function(err, data) {
    if(err) throw err;
    else {
      console.log
      res.end();
    }
  });
}

function edit(req, res, next) {
  // get data from forms and add to the table called user..
  if (!req.body.stallName || !req.body.SID) res.json({"err": "1"})
  else editCont(req,res,next);
}

function deleteCont(req, res, next) {
  var sql = `DELETE FROM Stall WHERE SID = ?`;
  var updateVenue = "UPDATE Venue SET Stalls = Stalls - 1 WHERE VID = ?";
  connection.query(sql, [req.body.SID], function(err, data) {
    if(err) throw err;
    else {
      connection.query(updateVenue, [req.body.VID], function(err, data) {
      res.json({"err":"0"});
      });
    }
  });
}
  
function deleteStall(req, res, next) {
  // get data from forms and add to the table called user..
  if (!req.body.stallName || !req.body.VID) res.json({"err": "1"})
  else deleteCont(req,res,next);
}

function vacate(req, res, next) {
  // get data from forms and add to the table called user..
  if (!req.body.stallName) res.json({"err": "1", "text":"Missing Parameters"});
  else vacateCont(req,res,next);
}

function vacateCont(req, res, next) {
  var sql = "SELECT R.RID FROM Request R, Stall S WHERE R.Client_CID = S.Client_CID AND S.SID = ?;";
  var sql2 = "UPDATE Request SET status = 0 WHERE RID = ?";
  var sql3 = "UPDATE Stall SET Client_CID = NULL WHERE SID = ?";
  connection.query(sql, [req.body.SID], function(err, data) {
    if(err) throw err;
    else {
      let rid = data[0].RID
      connection.query(sql2, [rid], function(err, data) {
        if(err) throw err;
        else {
          connection.query(sql3, [req.body.SID], function(err, data) {
            if(err) throw err;
            else {
              res.json({"err":"0", "text": "Successful Removal of Client"})
            }
          });
        }
      });
    }
  });
}

module.exports = router;
