const express = require('express');
const app = express();
const  bodyParser = require('body-parser');
const  port = process.env.PORT || 3000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true})); 

const mysql = require('mysql');
const connection = require('./db');

//changes all values of present to 0 in client table

app.post("/resetAttendance", function(req, res) {
  var resetPresent = "UPDATE Client SET present = '0' ";
  connection.query(isPresent, function (err, result) {
      if (err) throw err;
      //console.log(`Changed ${result.changedRows} row(s)`);
      res.send("All client attendance is reset");
  });
});
