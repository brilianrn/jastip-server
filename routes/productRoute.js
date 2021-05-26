const express = require('express');
const ProductController = require('../controllers/productController');
const route = express.Router();
const authentication = require('../middlerwares/auth');
const { 
  authorGetOneProduct, 
  authorGetUserProducts 
} = require('../middlerwares/productAuth');

route.get('/', ProductController.findAll);
route.get('/:id', ProductController.findOne);

route.use(authentication);
route.post('/', ProductController.createProduct);

route.get('/user/:userId', authorGetUserProducts, ProductController.showUserProducts);

route.put('/:id', authorGetOneProduct, ProductController.editProduct);
route.delete('/:id', authorGetOneProduct, ProductController.delete);

module.exports = route;