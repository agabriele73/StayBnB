const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();

// backend/routes/api/users.js
// ...
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
// ...

// backend/routes/api/users.js
// ...
const validateSignup = [
    check('email')
      .exists({ checkFalsy: true })
      .isEmail()
      .withMessage('Please provide a valid email.'),
    check('username')
      .exists({ checkFalsy: true })
      .isLength({ min: 4 })
      .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
      .not()
      .isEmail()
      .withMessage('Username cannot be an email.'),
    check('password')
      .exists({ checkFalsy: true })
      .isLength({ min: 6 })
      .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors
  ];

// backend/routes/api/users.js
// ...

// Sign up
router.post(
    '/',
    validateSignup,
    async (req, res) => {
      const { firstName, lastName, email, password, username } = req.body;
      try {
        
        const user = await User.signup({firstName, lastName, email, username, password });
        
    await setTokenCookie(res, user);
  
      return res.json({
        user: user
      });
    } catch (err) {
      // Handle errors thrown by User.signup() method
      if (err.name === 'SequelizeUniqueConstraintError') {
        const errors = {};
        if (err.fields.includes('email')) {
          errors.email = 'User with that email already exists';
        }
        if (err.fields.includes('username')) {
          errors.username = 'User with that username already exists';
        }
        return res.status(403).json({
          message: 'User already exists',
          statusCode: 403,
          errors: errors
        });
      } else if (err.name === 'ValidationError') {
        const errors = {};
        err.errors.forEach(error => {
          errors[error.param] = error.msg;
        });
        return res.status(400).json({
          message: 'Validation error',
          statusCode: 400,
          errors: errors
        });
      } else {
        return res.status(400).json({
          "message": "Validation error",
          "statusCode": 400,
          "errors": {
            "email": "Invalid email",
            "username": "Username is required",
            "firstName": "First Name is required",
            "lastName": "Last Name is required"
          }
        });
      }
    }
  }
);



module.exports = router;