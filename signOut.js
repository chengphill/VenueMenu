const express = require('express');
const app = express();
const  bodyParser = require('body-parser');
const  port = process.env.PORT || 3000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true})); 

const mysql = require('mysql');
const connection = require('./db');

//set present to 0 for attendance

app.post("/signOut", function(req, res) {

    var clientID = req.body.CID;
    var toSignOut = "UPDATE Client SET present = '0' WHERE CID = ?";
    
    connection.query(toSignOut, clientID, function (err, result) {
    if (err) throw err;
    console.log(`Changed ${result.changedRows} row(s)`);
    res.send("Signed out");
    })
});


