const Cart = require('../models/cartModel');
const { ObjectId } = require('mongodb');

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
      ProductId: ObjectId(req.body._id)
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
    let userId = "" + req.params.userId;

    Cart.findByUserId(userId)
      .then(data => {
        res.status(200).json(data);
      })
      .catch(err => {
        next(err);
      })
  }

  static updateQty(req, res, next) {
    let cartId = "" + req.params.cartId;
    let dataUpdate = {
      title: req.body.title,
      size: req.body.size,
      qty: +req.body.qty,
      priceAftDisc: +req.body.priceAftDisc,
      images: req.body.images,
      discExp: req.body.discExp,
      UserId: ObjectId(req.body.UserId),
      ProductId: ObjectId(req.body.ProductId),
    };
    let sendData = { dataUpdate, cartId };

    Cart.updateCart(sendData)
      .then(_ => {
        res.status(200).json({ message: `${dataUpdate.title} success to updated!` });
      })
      .catch(err => {
        next(err);
      })
  }

  static getOneByProductId(req, res, next) {
    let productId = "" + req.params.productId;

    Cart.findOneByProductId(productId)
      .then(data => {
        if (data.length) {
          res.status(200).json({ message: false, data });
        } else {
          res.status(200).json({ message: true });
        }
      })
      .catch(err => {
        next(err);
      })
  }

  static deleteCart(req, res, next) {
    let cartIds = req.body;

    cartIds.map(cartId => {
      return (
        Cart.deleteByCartId(cartId)
          .then(_ => {
            res.status(200).json({ message: 'Cart item success to delete!' });
          })
          .catch(err => {
            next(err);
          })
      )
    })
  }
}

module.exports = CartController;