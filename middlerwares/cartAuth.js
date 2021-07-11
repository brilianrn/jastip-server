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
  let cartId = req.params.cartId;

  Cart.findOne({ cartId, UserId: req.currentUser.id })
    .then(data => {
      if (data.length && "" + data[0].UserId === "" + req.currentUser.id) {
        next();
      } else {
        throw new Error({ name: 'Unauthorize for Update Cart', code: 401 });
      }
    })
    .catch(_ => {
      next({ name: 'Unauthorize for Update Cart', code: 401 });
    })
}

function authorDeleteCart(req, _, next) {
  let productIds = req.body;

  productIds.map(productId =>
    Cart.findOneByProductId({
      productId: "" + productId,
      UserId: "" + req.currentUser.id
    })
      .then(data => {
        if (data.length && "" + data[0].ProductId === "" + productId) {
          next();
        } else {
          throw new Error({ name: 'Unauthorize for Delete Cart', code: 401 });
        }
      })
      .catch(_ => {
        next({ name: 'Unauthorize for Delete Cart', code: 401 });
      })
  )
}

module.exports = { authorGetUserCarts, authorUpdateCart, authorDeleteCart };