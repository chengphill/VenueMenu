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
  console.log('MySQL Connected TagAPI');
});

// Body Parser
app.use(bodyParser.json());                        // Supports JSON encoded bodies
app.use(bodyParser.urlencoded({extended : true})); // Supports encoded bodies

// -----------------------------------------------------------------------------
// ** ROUTE **
// -----------------------------------------------------------------------------

router.post("/insert", function(req, res) {

  var sql = `INSERT INTO Tag (tagName, Venue_VID) VALUES (?,?)`;

  connection.query(sql, [req.body.tagName, req.body.VID], function(err, data) {
    if(err) throw err;
    else {
     res.end();
    }
  });
});

router.post("/delete", function(req, res) {

  var sql = `DELETE FROM Tag WHERE tagName = ? AND Venue_VID = ?`;

  connection.query(sql, [req.body.tagName, req.body.VID], function(err, data) {
    if(err) throw err;
    else {
      res.end();
    }
  });
});

router.post("/edit", function(req, res) {

  var sql = `UPDATE Tag SET tagName = ? WHERE TID = ? AND Venue_VID = ?`;

  connection.query(sql, [req.body.tagName, req.body.TID, req.body.VID], function(err, data) {
    if(err) throw err;
    else {
      res.end();
    }
  });
});


router.post('/link',(req, res) => {

    let sql = 'INSERT INTO Client_has_Tag (Client_CID, Tag_TID, Tag_Venue_VID) VALUES (?,?,?)';

    let query = connection.query(sql, [req.body.CID, req.body.TID, req.body.VID], (err, result) => {
        if(err) throw err;
       res.end();
    });
});

router.post('/unlink',(req, res) => {

    let sql = `DELETE FROM  Client_has_Tag WHERE Client_CID = ? AND Tag_TID = ?`;

    let query = connection.query(sql, [req.body.CID, req.body.TID], (err, result) => {
        if(err) throw err;
        res.end();
    });
});

module.exports = router;
