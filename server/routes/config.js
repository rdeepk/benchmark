var express = require('express');
// var router = express.Router();
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

module.exports = {
  checkJwt : jwt({
      // Dynamically provide a signing key based on the kid in the header and the singing keys provided by the JWKS endpoint.
      secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
      }),
    
      // Validate the audience and the issuer.
      audience: process.env.AUTH0_AUDIENCE,
      issuer: `https://${process.env.AUTH0_DOMAIN}/`,
      algorithms: ['RS256']
    })
}