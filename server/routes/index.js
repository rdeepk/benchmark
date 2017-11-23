var express = require('express');
var passport = require('passport');
var router = express.Router();
// var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();
// var request = require('request');
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const jwtAuthz = require('express-jwt-authz');


const checkJwt = jwt({
    // Dynamically provide a signing key based on the kid in the header and the singing keys provided by the JWKS endpoint.
    secret: jwksRsa.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
    }),
  
    // Validate the audience and the issuer.
    audience: process.env.AUTH0_AUDIENCE,
    issuer: `https://${process.env.AUTH0_DOMAIN}/`,
    algorithms: ['RS256']
  });

// We are going to want to share some data between our server and UI, so we'll be sure to pass that data in an env variable.
// var env = {
// };

router.get('/', function(req, res, next) {
  // Now, rather then just sending the text "You are on the homepage", we are going to actually render the view we created using the res.render method. The second argument will allow us to pass in data from the backend to our view dynamically.
  res.send('index');
});

router.get('/login',function(req, res){
  // Same thing for the login page.
  
  res.send('login');
});

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/login');
});

router.get('/bulletin', checkJwt, jwtAuthz(['read:bulletin']), function(req, res){
    res.send('bulletin msgs');
})

// router.get('/user', ensureLoggedIn, function(req, res, next) {
//   // Same thing for our 
//   res.render('user', { env: env, user: req.user });
// });


// var env = {
//     AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
//     AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
//     AUTH0_CALLBACK_URL: 'http://localhost:3000/callback'
//   };
  
  // ...
  
  // We are also going to implement the callback route which will redirect the logged in user to the polls page if authentication succeeds.
//   router.get('/callback',
//     passport.authenticate('auth0', { failureRedirect: '/' }),
//     function(req, res) {
//       res.redirect(req.session.returnTo || '/bulletin');
//     });

module.exports = router;