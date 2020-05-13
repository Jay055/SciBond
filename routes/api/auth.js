const express = require('express');
const router = express.Router();
// import auth middleware 

const bcrypt = require('bcryptjs');

const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');
// @route    GET api/auth
// @desc     Test route
// @access   Public

// Init auth from middleware, make the route protected 
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// User login 

// @route    POST api/auth
// @desc     Authenticate user & get token
// @access   Public

// Register Users using post request with validators 
router.post(
  '/',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
  ],
  async (req, res) => {

    // Return errors with express-validator if errors are detected 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Destructure req.body
    const { email, password } = req.body;

    try {
      // See if user exists 
      let user = await User.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }
      // Compare Passwords with bycrypt 
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      // Return json web token
      // Create token payload 
      const payload = {
        user: {
          id: user.id
        }
      };

      // pass in secret key, set a token expiration time, return jwt to client 
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );

      // Send response to User route if we have no errors 
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);




module.exports = router;