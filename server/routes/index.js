var express = require('express');
var router = express.Router();

// On our router variable, we'll be able to include various methods. For our app we'll only make use of GET requests, so the method router.get will handle that interaction. This method takes a string as its first parameter and that is the url path, so for the first route we are just giving it '/', which means the default route. Next we are defining a Node Js callback function, that takes three parameters, a request (req), a response (res), and an optional next (next) parameter. Finally, in our callback function, we are just send the message "You are on the homepage".
router.get('/', function(req, res, next) {
  res.send('You are on the homepage');
});

// We are going to do the same thing for the remaining routes.
router.get('/login',function(req, res){
  res.send('You are on the login page');
});

router.get('/logout', function(req, res){
  res.send('You are on the logout page');
});

router.get('/polls', function(req, res){
  res.send('You are on the polls page');
})

router.get('/user', function(req, res, next) {
  res.send('You are on the user page');
});

// Finally, we export this module so that we can import it in our app.js file and gain access to the routes we defined.
module.exports = router;