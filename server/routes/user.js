var express = require('express');
var router = express.Router();
const config = require('./config');
const jwtAuthz = require('express-jwt-authz');
var user = require('./../controllers/user');

router.post('/create', config.checkJwt, user.create);
router.get('/all', config.checkJwt, user.SaveAllUsersInAuth0);
router.get('/links', config.checkJwt, user.getLinks);
router.get('/id', config.checkJwt, user.getUserById);

module.exports = router;


