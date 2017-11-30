const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    dotenv = require('dotenv');
var port = process.env.PORT || 8000;
var cors = require('cors')
const session = require('express-session');
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');

dotenv.load();


app.use(cors());

// app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(session({
//   // Here we are creating a unique session identifier
//   secret: 'shhhhhhhhh',
//   resave: true,
//   saveUninitialized: true
// }));

// var index = require('./routes/index');
var grade = require('./routes/grade');
var user = require('./routes/user');
var role = require('./routes/role');
var invite = require('./routes/invite');
var bulletin = require('./routes/bulletin');
var teacher = require('./routes/teacher');
var attendance = require('./routes/attendance');
var parent = require('./routes/parent');

// app.use('/', index);
// app.use('/links', index);
app.use('/grade', grade);
app.use('/user', user);
app.use('/role', role);
app.use('/invite', invite);
app.use('/bulletin', bulletin);
app.use('/teacher', teacher);
app.use('/attendance', attendance);
app.use('/parent', parent);



// catch 404 and forward to error handler.
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// If our applicatione encounters an error, we'll display the error and stacktrace accordingly.
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send(err);
});

app.listen(port);
