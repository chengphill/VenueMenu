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
router.post('/make', make)
router.post('/approve', approve)
router.post('/deny', deny)

//------------------------------------------------------------------------------
// ** Make Suite**
//------------------------------------------------------------------------------

function make(req,res){
  if (!req.body.RID||!req.body.CID||!req.body.text) res.json({"err":"1", "errText":"Missing Parameters"});
  else makeCont(req,req);
}
  
function makeCont(req, res) {
    //let cid = req.body.CID;
    //let vid = req.body.VID;
    //let text = req.body.text;

    let sql = 'INSERT INTO Request (Client_CID, Venue_VID, text, date) VALUES (?,?,?, CURRENT_DATE())';

    let query = connection.query(sql, [req.body.CID, req.body.VID, req.body.text], (err, result) => {
      if(err) throw err;
      else {
        console.log("No errors editing"); // successfully inserted into db
        res.json({"err":"0"});
      }
    });
}

// -----------------------------------------------------------------------------
// ** Approval Suite **
// -----------------------------------------------------------------------------

function approve(req , res){
  if (!req.body.RID) res.json({"err":"1", "errText":"Missing Parameters"})
  else getEmptyStalls(req , res);
}

function approveSpaceCheck(req , res){
  if (check > 0){
    approveRequest(req , res);
  }
  else {
    res.json({"err":"2", "errText":"No Free Space In Venue"});
  }
}

function getEmptyStalls(req,res){
  let sql = "SELECT Venue_VID FROM Request WHERE RID = ?";
  let sql2 = 'SELECT count(SID) as count FROM Stall WHERE Venue_VID = ? AND  Client_CID IS NULL';
  let sql3 = 'SELECT Stalls FROM Venue WHERE VID = ?';
  connection.query(sql, [req.body.RID], (err, result) => {
    if(err) throw err;
    let vid = result[0].Venue_VID;
    connection.query(sql2, [vid], (err, result) => {
      if(err) throw err;
      let count = result[0].count;
      connection.query(sql3, [vid], (err, result) => {
        if(err) throw err;
        let stalls = result[0].Stalls
        if ((stalls - count)>0){
	  approveRequest(req , res);
	}
        else {
    	  res.json({"err":"2", "errText":"No Free Space In Venue"});
        }
      });
    });
  });
}

function selectFirstEmptyStall(req,res){
  let sql = 'SELECT SID FROM Stall WHERE Client_CID IS NULL ORDER BY SID ASC LIMIT 1'
  let query = connection.query(sql, (err, result) => {
    if(err) throw err;
    else {
      return result[0].SID;
    }
  });
}

// approve request
function approveRequest(req, res) {
    let sql = `UPDATE Request SET status = 1 WHERE RID = ?`;
    let query = connection.query(sql, [req.body.RID], (err, result) => {
      if(err) throw err;
      else {
        console.log("Request Approved"); // successfully inserted into db
        updateStalls(req,res);
      }
    });
}

function updateStalls(req,res){
  let sql = 'SELECT SID FROM Stall WHERE Client_CID IS NULL ORDER BY SID ASC LIMIT 1'
  let query = connection.query(sql, (err, result) => {
    if(err) throw err;
    else {
      let sid = result[0].SID;
      let sql2 = "SELECT Client_CID FROM Request WHERE RID = ?";
      let query = connection.query(sql2,[req.body.RID], (err, result) => {
        if(err) throw err;
        else {
          let cid = result[0].Client_CID;
          let sql3 = "UPDATE Stall SET Client_CID = ? WHERE SID = ?";
          let query = connection.query(sql3, [cid,sid], (err, result) => {
            if(err) throw err;
            else {
              console.log("Stall Updated");
              res.json({"err":"0", "text":"Successfully Updated Request and Linked Client to Stall"});
            }
          });
        }
      });
    }
  });
}

function selectFirstEmptyStall(req,res){
  let sql = 'SELECT SID FROM Stall WHERE Client_CID IS NULL ORDER BY SID ASC LIMIT 1'
  let query = connection.query(sql, (err, result) => {
    if(err) throw err;
    else {
      return result[0].SID;
    }
  });
}

// -----------------------------------------------------------------------------
// ** Deny Suite **
// -----------------------------------------------------------------------------

function deny(req,res){
  if (!req.body.RID) res.json({"err":"1", "errText":"Missing Parameters"})
  else denyCont(req,req);
}

function denyCont(req, res) {

    let sql = `UPDATE Request SET status = 2 WHERE RID = ?`;

    let query = connection.query(sql, [req.body.RID], (err, result) => {
      if(err) throw err;
      else {
        console.log("No errors editing"); // successfully inserted into db
        res.end();
      }

    });
}


module.exports = router;
