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

router.post("/insert", function(req, res) {
  // get data from forms and add to the table called user..

  var sql = `INSERT INTO Stall (stallName, Venue_VID ) VALUES (?, ?)`;

  connection.query(sql, [req.body.stallName, req.body.VID], function(err, data) {
    if(err) throw err;
    else {
      res.end();
    }
  });
});

router.post("/edit", function(req, res) {
  // get data from forms and add to the table called user..

  var sql = `UPDATE Stall SET stallName = ? WHERE SID = ?`;

  connection.query(sql, [req.body.stallName, req.body.SID], function(err, data) {
    if(err) throw err;
    else {
      res.end();
    }
  });
});

router.post("/delete", function(req, res) {
  // get data from forms and add to the table called user..

  var sql = `DELETE FROM Stall WHERE SID = ?`;

  connection.query(sql, [req.body.SID], function(err, data) {
    if(err) throw err;
    else {
      res.end();
    }
  });
});

module.exports = router;
