const route = require('express').Router();
const authentication = require('../middlerwares/auth');
const OngkirCheckController = require('../controllers/ongkirCheckController');

route.use(authentication);
route.get('/provinces', OngkirCheckController.getProvices);
route.post('/cities', OngkirCheckController.getCities);
route.post('/costs', OngkirCheckController.getCosts);
route.post('/orders', OngkirCheckController.getOrders);

module.exports = route;