const express = require('express');
const route = express.Router();
const userRoute = require('./userRoute');
const productRoute = require('./productRoute');
const cartRoute = require('./cartRoute');
const paymentRoute = require('./paymentRoute');

route.get('/', (_, res) => {
  res.send('jastip-app 0.1');
});

route.use('/user', userRoute);
route.use('/products', productRoute);
route.use('/cart', cartRoute);
route.use('/payment', paymentRoute);

module.exports = route;