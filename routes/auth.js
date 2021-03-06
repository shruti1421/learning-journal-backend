const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs/dist/bcrypt');
const config = require('config');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const auth = require('../middleware/auth');
require('dotenv').config()

// @route  GET  api/auth
// @desc   Get logged in user
// @acess  Private 
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route  POST  api/auth
// @desc   Auth user and get token
// @acess  Public 
router.post(
    '/',
    [
      check('email', 'Please include a valid email').isEmail(),
      check('password', 'Password is required').exists(),
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
      }
  
      const {email, password} = req.body;
  
      try {
        let user = await User.findOne({email});
  
        if (!user) {
          return res.status(400).json({msg: 'Invalid Credentials'});
        }
  
        const isMatch = await bcrypt.compare(password, user.password);
  
        if (!isMatch) {
          return res.status(400).json({msg: 'Invalid Credentials'});
        }
  
        const payload = {
          user: {
            id: user.id,
          },
        };
  
        jwt.sign(
          payload,
          process.env.jwtSecret,
          {
            expiresIn: 36000000000,
          },
          (err, token) => {
            if (err) throw err;
            // console.log(token)
            res.json({token});
          },
        );
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
    },
  );
  

module.exports = router;