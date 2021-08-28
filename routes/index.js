const express = require('express');
const route = express.Router();
const userRoute = require('./userRoute');
const productRoute = require('./productRoute');
const cartRoute = require('./cartRoute');
const paymentRoute = require('./paymentRoute');
const checkoutRoute = require('./checkoutRoute');
const ongkirCheckRoute = require('./ongkirCheckRoute');

route.get('/', (_, res) => {
  res.send('jastip-app 0.1');
});

route.use('/user', userRoute);
route.use('/products', productRoute);
route.use('/cart', cartRoute);
route.use('/payment', paymentRoute);
route.use('/checkout', checkoutRoute);
route.use('/ongkirCheck', ongkirCheckRoute);

module.exports = route;