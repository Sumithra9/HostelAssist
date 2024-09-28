const express = require('express');
const { registerUser, authUser } = require('../controllers/userController');
const router = express.Router();

// User routes
router.post('/register', registerUser);
router.post('/login', authUser);

module.exports = router;
