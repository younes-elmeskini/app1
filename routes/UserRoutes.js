const express = require('express');
const router = express.Router();
const { signupUser, loginUser  } = require('../controllers/UserController');
const { validationandHandlerrors ,validation } = require('../utils/Validation');
const { body } = require('express-validator');

router.post('/signup',validation.validateName,validation.validateEmail,validation.validatePassword, validationandHandlerrors , signupUser );

router.post('/login',validation.validateEmail,validation.validatePassword, validationandHandlerrors , loginUser );

module.exports = router; 