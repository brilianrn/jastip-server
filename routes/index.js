const express = require('express');
const route = express.Router();
const userRoute = require('./userRoute');
const productRoute = require('./productRoute');

route.get('/', (req, res) => {
  res.send('jastip-app 0.1');
});

route.use('/user', userRoute);
route.use('/products', productRoute);

module.exports = route;