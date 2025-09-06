console.log('Auth routes file has been loaded!'); // Add this for testing

const express = require('express');
const router = express.Router();
const { login } = require('../controllers/authController.js');

router.post('/login', login);

module.exports = router;