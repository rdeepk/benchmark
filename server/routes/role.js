var express = require('express');
var router = express.Router();
const config = require('./config');
const jwtAuthz = require('express-jwt-authz');
var role = require('./../controllers/role');

router.post('/create', config.checkJwt, role.create);
  
module.exports = router;