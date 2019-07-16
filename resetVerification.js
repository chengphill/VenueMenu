const express = require('express');
const app = express();
const  bodyParser = require('body-parser');
const  port = process.env.PORT || 3000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true})); 

const mysql = require('mysql');
const connection = require('./db');

//set all verify to 0 in stall table

app.post("/resetVerification", function(req, res) {
    var resetVerification = "UPDATE Stall SET verify = 0";
    connection.query(resetVerification, function (err, result) {
    if (err) throw err;
    console.log(`Changed ${result.changedRows} row(s)`);
    res.send("All stall verifications are reset");
    })
});
