const Cart = require('../models/cartModel');

function authorGetUserCarts(req, _, next) {
  Cart.findByUserId(req.params.userId)
    .then(data => {
      if (data && data[0].UserId == req.params.userId) {
        next();
      } else {
        next({ name: 'Unauthorize for All Carts', code: 401 });
      }
    })
    .catch(err => {
      next(err);
    })
}

function authorUpdateCart(req, _, next) {
  let cartId = req.params.cartId
  Cart.findOne(cartId)
    .then(data => {
      // if (data && "" + data[0].UserId === "" + req.currentUser.id) {
      if (data) {
        next();
      } else {
        next({ name: 'Unauthorize for Update Cart', code: 401 });
      }
    })
    .catch(err => {
      next(err);
    })
}

module.exports = { authorGetUserCarts, authorUpdateCart };