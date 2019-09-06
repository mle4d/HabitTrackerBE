const jwt = require('express-jwt');
const jwtRsa = require('jwks-rsa');

module.exports = jwt({
  credentialsRequired: process.env.NODE_ENV !== 'test',
  secret: jwtRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestPerMinute: 5,
    jwksUri: 'https://mle4d.auth0.com/.well-known/jwks.json'
  }),
  audience: 'w4WwSBr4UyA9wN68nUcNKgtnogx4oc0m',
  issuer: 'https://mle4d.auth0.com/',
  algorithims: ['RS256']
});
