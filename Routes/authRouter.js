const express = require('express');
const { registerController, loginController } = require('../controllers/auth');
const {dashboardController} = require('./dashboard');
require('../config');
const users = express.Router();

//register api 
users.post('/register', registerController)

users.post('/login', loginController)

users.get('/',dashboardController)

module.exports = users;