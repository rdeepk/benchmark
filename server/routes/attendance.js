var express = require('express');
var router = express.Router();
const config = require('./config');
const jwtAuthz = require('express-jwt-authz');
var attendance = require('./../controllers/attendance');

router.post('/create', config.checkJwt, attendance.create);

module.exports = router;