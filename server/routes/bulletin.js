var express = require('express');
var router = express.Router();
const config = require('./config');
const jwtAuthz = require('express-jwt-authz');
var bulletin = require('./../controllers/bulletin');

router.post('/create', config.checkJwt, bulletin.create);
router.get('/messages', config.checkJwt, bulletin.getMessages);
router.post('/update', config.checkJwt, bulletin.update);
router.delete('/delete', config.checkJwt, bulletin.delete);

module.exports = router;