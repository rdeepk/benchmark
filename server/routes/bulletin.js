var express = require('express');
var router = express.Router();
const config = require('./config');
const jwtAuthz = require('express-jwt-authz');
var bulletin = require('./../controllers/bulletin');

router.get('/messages', config.checkJwt, bulletin.getMessages);
router.post('/create', config.checkJwt, bulletin.create);
  
module.exports = router;