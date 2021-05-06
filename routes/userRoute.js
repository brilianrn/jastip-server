const express = require('express');
const UserController = require('../controllers/userController');
const route = express.Router();
const { authentication } = require('../middlerwares/auth');

route.post('/register', UserController.register);
route.post('/login', UserController.login);

route.use(authentication);
route.get('/', UserController.findOne);

module.exports = route;