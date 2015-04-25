var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var events = require('./routes/events');
var users = require('./routes/users');
var api = require('./routes/api');
mongoose = require('mongoose');
restful = require('node-restful');

var cors = require('cors');
fs = require('fs');
var app = express();

mongoose = restful.mongoose; 
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/events', events);
app.use('/users', users);

app.get('/sign_s3', api.upload);

var url = "mongodb://Delke:Black2827@proximus.modulusmongo.net:27017/Onune8xe";
//var url = "monogdb://http:localhost:3000/shawn";

// mongoose.connect('mongodb://localhost/shawn',function(err) {
//   console.log(err);
// });

mongoose.connect(url,function(err) {
  console.log(err);
});

var db = mongoose.connection;
db.on('open', function(callback) {
  console.log('connected to db');
 
});

var UserSchema = new mongoose.Schema({
  username: {type : String},
  profileUrl : {type: String},
  date: {type: Date, default: Date.now}
});

var Users = restful.model('users', UserSchema);
Users.methods(['get','put','post','delete']);
Users.register(app, '/api/users');

var EventSchema = new mongoose.Schema({
  user: {type : String},
  eventName:{type: String},
  genre: {type: String},
  address: {type: String},
  city: {type: String},
  state: {type: String},
  zipcode:{type: Number},
 month: {type: String},
  day: {type: Number},
   year: {type: Number},

  imageUrl: {type: String},
  likes: [
      {
      user: {type: String },
      profileUrl : {type: String}
    }],
  date: {type: Date, default: Date.now}
});

// creating models
var Event = restful.model('events', EventSchema);
Event.methods(['get','put','post','delete']);
Event.register(app, '/api/events');





app.listen(8080);
console.log('listening on port 8080');


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
