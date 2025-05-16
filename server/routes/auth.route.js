const express = require('express');
const { googleSignIn, register, login } = require('../controllers/auth.controller');

const router = express.Router();

// Google sign-in
router.post('/google-sign-in', googleSignIn);

// Email/password registration
router.post('/register', register);

// Email/password login
router.post('/login', login);

module.exports = router;