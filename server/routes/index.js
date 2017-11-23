var express = require('express');
var passport = require('passport');
var router = express.Router();
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

router.get('/bulletin', checkJwt, jwtAuthz(['read:all']), function(req, res){
  console.log(checkJwt);
  console.log(jwtAuthz);
    res.send('bulletin msgs');
})

module.exports = router;