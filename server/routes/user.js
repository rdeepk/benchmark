var express = require('express');
var router = express.Router();
const config = require('./config');
const jwtAuthz = require('express-jwt-authz');
var user = require('./../controllers/user');

router.post('/create', config.checkJwt, user.create);

module.exports = router;


