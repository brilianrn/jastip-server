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
      if (data && "" + data[0].UserId === "" + req.currentUser.id) {
        next();
      } else {
        next({ name: 'Unauthorize for Update Cart', code: 401 });
      }
    })
    .catch(err => {
      next(err);
    })
}

function authorDeleteCart(req, _, next) {
  let cartIds = req.body;

  cartIds.map(cartId =>
    Cart.findOne(cartId)
      .then(data => {
        if ("" + data[0]._id === "" + cartId) {
          next();
        }
      })
      .catch(err => {
        next({ name: 'Unauthorize for Delete Cart', code: 401 });
      })
  )
}

module.exports = { authorGetUserCarts, authorUpdateCart, authorDeleteCart };