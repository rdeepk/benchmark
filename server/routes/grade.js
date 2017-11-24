var express = require('express');
var router = express.Router();
const config = require('./config');
const jwtAuthz = require('express-jwt-authz');
var grade = require('./../controllers/grade');

router.get('/grades', config.checkJwt, jwtAuthz(['read:all']), function(req, res){
    res.send('classes');
})

router.post('/create', config.checkJwt, grade.create);
  
module.exports = router;