const express = require('express');
const { registerController, loginController } = require('../controllers/auth');
const {dashboardController} = require('./dashboard');
const verifyUserToken = require('./validate-token');

require('../config');

const users = express.Router();

//register api 
users.post('/register', registerController)

users.post('/login', loginController)

users.get('/dashboard', verifyUserToken,dashboardController)

module.exports = users;