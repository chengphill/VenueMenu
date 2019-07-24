var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var session    = require('express-session');

var indexRouter = require('./routes/index');
var adminAccountRouter = require('./routes/AccountAPI/AdminAPI');
var clientAccountRouter = require('./routes/AccountAPI/ClientAPI');
var logoutRouter = require('./routes/LogoutAPI');
var administrationRouter = require('./routes/AdministrationAPI');
var requestRouter = require('./routes/RequestAPI');
var stallRouter = require('./routes/StallAPI');
var tagRouter = require('./routes/TagAPI');
var viewsRouter = require('./routes/ViewsAPI');

var app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(session({
  secret : 'projectwolverinevenue',
  resave : true,
  saveUninitialized: true
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());                        // Supports JSON encoded bodies
app.use(bodyParser.urlencoded({extended : true})); // Supports encoded bodies

app.use('/', indexRouter);
app.use('/API/Accounts/Admin/', adminAccountRouter);
app.use('/API/Accounts/Client/', clientAccountRouter);
app.use('/API/Accounts/Logout/', logoutRouter);
app.use('/API/Administration/', administrationRouter);
app.use('/API/Requests/', requestRouter);
app.use('/API/Stalls/', stallRouter);
app.use('/API/Tags/', tagRouter);
app.use('/API/Views/', viewsRouter);

module.exports = app;
