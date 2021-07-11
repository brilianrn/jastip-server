const Cart = require('../models/cartModel');
const User = require('../models/userModel');
const Product = require('../models/productModel');
const { ObjectId } = require('mongodb');
const getDifferentValues = require('../helpers/getDifferentValues');

class CartController {
  static createCart(req, res, next) {
    User.getOneUser("" + req.currentUser.id)
      .then(user => {
        if (user.myCarts.length) {
          let tempCart = user.myCarts.filter(cart => "" + cart === "" + req.body._id);

          if (tempCart.length) {
            res.status(400).json({ isProper: true, message: `${req.body.title} has already exists in Your cart` });
          } else {
            let price = req.body.price;
            let discount = req.body.discount;
            let newCart = {
              title: req.body.title,
              size: req.body.size,
              priceAftDisc: price - (price * discount / 100),
              qty: {
                qty: 1,
                isOverQty: false
              },
              images: req.body.images,
              discExp: req.body.discExp,
              UserId: req.currentUser.id,
              ProductId: ObjectId(req.body._id)
            };
            let editUser = {
              first_name: user.first_name,
              last_name: user.last_name,
              email: user.email,
              phone_number: user.phoneNumber,
              password: user.password,
              birth_date: user.birth_date,
              wallet: user.wallet,
              role: user.role,
              myCarts: [...user.myCarts, req.body._id]
            };

            User.updateUser({
              id: req.currentUser.id,
              editUser
            })
              .then(data => {
                if (data) {
                  Cart.addCart(newCart)
                    .then(({ ops }) => {
                      res.status(201).json({ isProper: false, message: `${ops[0].title} success addedd to cart` });
                    })
                    .catch(err => {
                      next(err);
                    })
                }
              })
              .catch(err => {
                next(err);
              })
          }
        } else {
          let price = req.body.price;
          let discount = req.body.discount;
          let newCart = {
            title: req.body.title,
            size: req.body.size,
            priceAftDisc: price - (price * discount / 100),
            qty: {
              qty: 1,
              isOverQty: false
            },
            images: req.body.images,
            discExp: req.body.discExp,
            UserId: req.currentUser.id,
            ProductId: ObjectId(req.body._id)
          };
          let editUser = {
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            phone_number: user.phoneNumber,
            password: user.password,
            birth_date: user.birth_date,
            wallet: user.wallet,
            role: user.role,
            myCarts: [...user.myCarts, req.body._id]
          };

          User.updateUser({
            id: req.currentUser.id,
            editUser
          })
            .then(data => {
              if (data) {
                Cart.addCart(newCart)
                  .then(({ ops }) => {
                    res.status(201).json({ message: `${ops[0].title} success addedd to cart` });
                  })
                  .catch(err => {
                    next(err);
                  })
              }
            })
            .catch(err => {
              next(err);
            })
        }
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
      qty: req.body.qty,
      priceAftDisc: +req.body.priceAftDisc,
      images: req.body.images,
      discExp: req.body.discExp,
      UserId: ObjectId(req.body.UserId),
      ProductId: ObjectId(req.body.ProductId),
    };
    let sendData = { dataUpdate, cartId, UserId: req.currentUser.id };

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

    Cart.findOneByProductId({ productId, UserId: "" + req.currentUser.id })
      .then(data => {
        if ("" + data[0].UserId === "" + req.currentUser.id) {
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

    User.getOneUser("" + req.currentUser.id)
      .then(user => {
        let editUser = user;
        let cartTemp;

        if (cartIds.length > 1) {
          cartTemp = getDifferentValues(cartIds, user.myCarts);
        } else if (cartIds.length === 1) {
          cartTemp = user.myCarts.filter(el => {
            return (
              el + "" !== cartIds[0] + ""
            )
          });
        }

        editUser = { ...user, myCarts: cartTemp };

        User.updateUser({
          id: "" + req.currentUser.id,
          editUser
        })
          .then(_ => {
            cartIds.map(productId => {
              return (
                Cart.deleteByCartId({
                  ProductId: productId + "",
                  UserId: req.currentUser.id + ""
                })
                  .then(_ => {
                    res.status(200).json({ message: 'Cart item success to delete!' });
                  })
                  .catch(err => {
                    next(err);
                  })
              )
            })
          })
          .catch(err => {
            next(err);
          })
      })
      .catch(err => {
        next(err);
      })
  }

  static stockCheck(req, res, next) {
    let productId = "" + req.params.productId;

    Product.getOneProduct(productId)
      .then(data => {
        res.status(200).json(data);
      })
      .catch(err => {
        next(err);
      })
  }
}

module.exports = CartController;