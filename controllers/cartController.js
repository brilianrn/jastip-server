const Cart = require('../models/cartModel');

class CartController {
  static createCart(req, res, next) {
    let price = req.body.price;
    let discount = req.body.discount;
    let newCart = {
      title: req.body.title,
      size: req.body.size,
      priceAftDisc: price - (price * discount / 100),
      qty: 1,
      images: req.body.images,
      discExp: req.body.discExp,
      UserId: req.currentUser.id,
      ProductId: req.body._id
    };

    Cart.addCart(newCart)
      .then(({ ops }) => {
        res.status(201).json({ message: `${ops[0].title} success addedd to cart` });
      })
      .catch(err => {
        next(err);
      })
  }

  static getCarts(req, res, next) {
    let userId = req.params.userId;

    Cart.findByUserId(userId)
      .then(data => {
        res.status(200).json(data);
      })
      .catch(err => {
        next(err);
      })
  }
}

module.exports = CartController;