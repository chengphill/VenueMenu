const express = require('express');
const app = express();
const  bodyParser = require('body-parser');
const  port = process.env.PORT || 3000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true})); 

const mysql = require('mysql');
const connection = require('./db');

//set verify to 0 for stall verification

app.post("/unVerifyStall", function(req, res) {
    
    stallID = req.body.SID;
    var unVerify = "UPDATE Stall SET verify = '0' WHERE SID = ?";
    
    connection.query(unVerify, stallID, function (err, result) {
    if (err) throw err;
    //console.log(`Changed ${result.changedRows} row(s)`);
    res.send('Stall is unverified');
    })
});
