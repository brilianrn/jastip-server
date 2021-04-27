const express = require('express');
const UserController = require('../controllers/userController');
const route = express.Router();

route.post('/register', UserController.register);

module.exports = route;