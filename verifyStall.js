const express = require('express');
const app = express();
const path = require('path');
const  bodyParser = require('body-parser');
const  PORT = process.env.PORT || 3000;

//body parser middle ware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true})); 

const mysql = require('mysql');
const connection = require('./db');


//set verify to 1 for stall verification
//using the stallname   
    
    app.post("/", function(req, res) {

        //sql queries
        var clientPresent = "SELECT * FROM Client WHERE stallName = ?";
        var isVerfied = "UPDATE Stall SET verified = '1' WHERE SID = 1";

        //get stallname
        var name = req.body.stallName;

        var isPresent = 0; //client not checked in default value 0

        connection.query(clientPresent, [name], function (err, result2) {
            
            if (err) throw err;
            
            //get present value of client: 0 or 1. 1 is present
            isPresent = parseInt(result2[0].present,10);
            
            if (isPresent == 1){
                //is verified so update verify to 1 in stall
                connection.query(isVerfied, function (err, result) {
                    if (err) throw err;
                    })
        
            }else{
                //return an error to user client not checked in
                //console.log('ERROR: Client has not checked in yet');
                res.send(1);
            }
        
        
        });        
    });
   
