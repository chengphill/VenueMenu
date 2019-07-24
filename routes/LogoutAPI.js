// -----------------------------------------------------------------------------
// ** IMPORTS **
// -----------------------------------------------------------------------------
var express    = require('express');
var router     = express.Router();
var config     = require('./Config');
var bodyParser = require('body-parser');     // Used for getting request values
var bcrypt     = require('bcrypt');          // Used for encrypting passwords

var app = express();

// -----------------------------------------------------------------------------
// ** MIDDLEWARE **
// -----------------------------------------------------------------------------

// Body Parser
app.use(bodyParser.json());                        // Supports JSON encoded bodies
app.use(bodyParser.urlencoded({extended : true})); // Supports encoded bodies

// -----------------------------------------------------------------------------
// ** ROUTE **
// -----------------------------------------------------------------------------

router.post('/', function(req, res, next) {
  req.session.destroy();
  res.end();
});

module.exports = router;