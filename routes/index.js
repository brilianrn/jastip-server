const express = require('express');
const route = express.Router();
const userRoute = require('./userRoute');

route.get('/', (req, res) => {
  res.send('jastip-app 0.1');
});

route.use('/user', userRoute);

module.exports = route;