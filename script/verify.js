const express = require('express');
const router = express.Router();
const registerController = require('../script/authorize');
const loginController = require('../script/authorize');
const logoutController = require('../script/authorize');
router.post('/register',registerController.register),
router.post('/login',loginController.login);
router.post('/logout',logoutController.logout);
module.exports = router;