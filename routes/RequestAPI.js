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
  console.log('MySQL Connected RequestAPI');
});

// Body Parser
app.use(bodyParser.json());                        // Supports JSON encoded bodies
app.use(bodyParser.urlencoded({extended : true})); // Supports encoded bodies

// -----------------------------------------------------------------------------
// ** ROUTE **
// -----------------------------------------------------------------------------

// make request
router.post('/make',(req, res) => {
    
    //let cid = req.body.CID;
    //let vid = req.body.VID;
    //let text = req.body.text;


    let sql = 'INSERT INTO Request (Client_CID, Venue_VID, text) VALUES (?,?,?)';

    let query = connection.query(sql, [req.body.CID, req.body.VID, req.body.text], (err, result) => {
      if(err) throw err;
      else {
        console.log("No errors editing"); // successfully inserted into db
        res.end();
      }
    });
});

// approve request
router.post('/approve',(req, res) => {

    let sql = `UPDATE Request SET status = 1 WHERE RID = ?`;

    let query = connection.query(sql, [req.body.RID], (err, result) => {
      if(err) throw err;
      else {
        console.log("No errors editing"); // successfully inserted into db
        res.end();
      }
    });
});

// deny request
router.post('/deny',(req, res) => {

    let sql = `UPDATE Request SET status = 2 WHERE RID = ?`;

    let query = connection.query(sql, [req.body.RID], (err, result) => {
      if(err) throw err;
      else {
        console.log("No errors editing"); // successfully inserted into db
        res.end();
      }

    });
});


module.exports = router;
