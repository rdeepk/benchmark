var express = require('express');
var router = express.Router();
const config = require('./config');
const jwtAuthz = require('express-jwt-authz');
var teacher = require('./../controllers/teacher');


router.get('/grades', config.checkJwt, teacher.getGrades);
  
module.exports = router;