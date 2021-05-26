const Product = require('../models/productModel');

function authorGetOneProduct(req, _, next) {
  const id = req.params.id;
  Product.getOneProduct(id)
    .then(data => {
      if (data) {
        if ('' + data.UserId === '' + req.currentUser.id) {
          next();
        } else {
          next({ name: 'Product Unauthorize', code: 401 });
        }
      } else {
        next({ name: 'Product Unauthorize', code: 401 });
      }
    })
    .catch(err => {
      next(err);
    })
}

function authorGetUserProducts(req, _, next) {
  Product.findByUserId(req.params.userId)
    .then(data => {
      if (data && data[0].UserId == req.params.userId) {
        next();
      } else {
        next({ name: 'Unauthorize for All Products', code: 401 });
      }
    })
    .catch(err => {
      next(err);
    })
}

module.exports = {
  authorGetOneProduct,
  authorGetUserProducts
};