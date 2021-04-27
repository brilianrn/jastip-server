const express = require('express');
const ProductController = require('../controllers/productController');
const route = express.Router();
const { authentication, authorization } = require('../middlerwares/auth');

route.get('/', ProductController.findAll);
route.get('/:id', ProductController.findOne);

route.use(authentication);
route.post('/', ProductController.createProduct);

route.put('/:id', authorization, ProductController.editProduct);
route.delete('/:id', authorization, ProductController.delete);

module.exports = route;