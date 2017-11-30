var express = require('express');
var router = express.Router();
const config = require('./config');
const jwtAuthz = require('express-jwt-authz');
var parent = require('./../controllers/parent');

router.post('/create', config.checkJwt, parent.create);
router.get('/attendance', config.checkJwt, parent.getAttendance);
router.get('/children', config.checkJwt, parent.getChildren);
  
module.exports = router;