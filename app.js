var express = require('express');
var session = require('express-session');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var uuidv5 = require('uuid/v5');

const env = require('dotenv').config();
var index = require('./routes/index');
var users = require('./routes/users');
var lifting = require('./routes/lifting');
var token = require('./routes/token');

var app = express();
var redisStore = require('connect-redis')(session);
var redis   = require("redis");
var client  = redis.createClient();

app.use("/scripts", express.static(path.join(__dirname, "node_modules/axios/dist")));

app.use(session({
  genid: function(req) {
    return uuidv5('localhost:3000', uuidv5.URL);
  },
  secret: process.env.GOOGLE_IDENTITY_SECRET,
  resave: false,
  saveUninitialized: false,
  store: new redisStore({
    client: client,
    ttl: 260
  })
}));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/lifting', lifting);
app.use('/token', token);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
