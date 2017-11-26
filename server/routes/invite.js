var express = require('express');
var router = express.Router();
const config = require('./config');
const jwtAuthz = require('express-jwt-authz');
var invite = require('./../controllers/invite');

router.post('/create', config.checkJwt, invite.create);
  
module.exports = router;