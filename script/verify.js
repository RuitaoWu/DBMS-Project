const express = require('express');
const router = express.Router();
const registerController = require('../script/authorize');
const loginController = require('../script/authorize');
router.post('/register',registerController.register),
router.post('/login',loginController.login);

module.exports = router;