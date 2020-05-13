//Middleware to authenticalte JWT (users.js) JWT, authenticate in the routes/auth.js file

const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token');

  // Check if not token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // Verify token
  try {
    //Decode token into decoded 
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    // assign decoded token to user 
    req.user = decoded.user;
    next();

    // if token !valid
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};