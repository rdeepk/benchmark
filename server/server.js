const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    router = express.Router(),
    dotenv = require('dotenv');
var port = process.env.PORT || 8080;
const session = require('express-session');
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');

dotenv.load();

var routes = require('./routes/index');
app.use('/', routes);
// The .use method is similar to the .set method, where it allows us to set further configurations. The .use method also acts as a chain of events that will take place once a request hits our Node Js application. First we'll log the request data, parse any incoming data, and so on.
// app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(session({
  // Here we are creating a unique session identifier
  secret: 'shhhhhhhhh',
  resave: true,
  saveUninitialized: true
}));

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

// Configure Passport to use Auth0
const strategy = new Auth0Strategy(
  {
    domain: 'YOUR_AUTH0_DOMAIN',
    clientID: 'YOUR_CLIENT_ID',
    clientSecret: 'YOUR_CLIENT_SECRET',
    callbackURL: 'http://localhost:8080/callback'
  },
  (accessToken, refreshToken, extraParams, profile, done) => {
    return done(null, profile);
  }
);

passport.use(strategy);

// This can be used to keep a smaller payload
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

// ...
app.use(passport.initialize());
app.use(passport.session());