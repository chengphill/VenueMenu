const express = require('express');
const app = express();
const  bodyParser = require('body-parser');
const  port = process.env.PORT || 3000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true})); 

const mysql = require('mysql');
const connection = require('./db');

//set present to 1 for attendance

app.post("/signIn", function(req, res) {
    
    var clientID = req.body.CID;
    var isPresent = "UPDATE Client SET present = '1' WHERE CID = ?";
    
    connection.query(isPresent, clientID, function (err, result) {
        if (err) throw err;
        res.send("Signed in");
    })
});


