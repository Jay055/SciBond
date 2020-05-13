// Register users 

const express = require('express');
const router = express.Router();
// Gravater for pics 
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
// jwt for  Authentication (!Authorization)
const jwt = require('jsonwebtoken');
// Config for JWT token 
const config = require('config');
// Express validators 
const { check, validationResult } = require('express-validator');


const User = require('../../models/User');

// @route    POST api/users
// @desc     Register user
// @access   Public


// Register Users using post request with validators 
router.post(
  '/',
  [
    check('name', 'Name is required')
      .not()
      .isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
   
   // Return errors with express-validators if errors are detected 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Destructure req.body

    const { name, email, password } = req.body;

    try {
      // Check if user exists 
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }

      // Create user -- Get users gravatar 
      const avatar = gravatar.url(email, {
        s: '200',     // size
        r: 'pg',       // rating 
        d: 'mm'         // default image "mm"
      });

      user = new User({
        name,
        email,
        avatar,
        password
      });

      // Encrypt password - generate salf from documentation, encryption goes higher with values (10)
      const salt = await bcrypt.genSalt(10);
        // Hash password with plain password and salt 
      user.password = await bcrypt.hash(password, salt);
        // save user 
      await user.save();

      // Return jsonwebtoken 
      // Create payload 
      const payload = {
        user: {
          id: user.id
        }
      };
      // pass in secret key, set timing, return jwt to client 
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    

        // if(!errors) send response to User route 
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;

// Post man 
// Header key: content-Type value: application/json