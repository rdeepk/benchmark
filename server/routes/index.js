var express = require('express');
var router = express.Router();
const config = require('./config');
const jwtAuthz = require('express-jwt-authz');

// router.get('/', function(req, res, next) {
//     // Now, rather then just sending the text "You are on the homepage", we are going to actually render the view we created using the res.render method. The second argument will allow us to pass in data from the backend to our view dynamically.
//     res.send('index');
//   });
  
//   router.get('/login',function(req, res){
//     // Same thing for the login page.
    
//     res.send('login');
//   });
  
//   router.get('/logout', function(req, res){
//     req.logout();
//     res.redirect('/login');
//   });
  
  router.get('/bulletin', config.checkJwt, jwtAuthz(['read:all']), function(req, res){
    console.log(req.user);
      res.send('bulletin msgs');
  })

  router.get('/classes', config.checkJwt, jwtAuthz(['read:all']), function(req, res){
    console.log(req.user);
      res.send('classes');
  })
  
  module.exports = router;