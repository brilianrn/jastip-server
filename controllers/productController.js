const Product = require('../models/productModel');

class ProductController {
  static findAll(_, res, next) {
    Product.getAllProduct()
      .then(data => {
        res.status(200).json(data);
      })
      .catch(err => {
        next(err);
      })
  }

  static createProduct(req, res, next) {
    const newProduct = {
      title: req.body.title,
      type: req.body.type,
      size: req.body.size,
      color: req.body.color,
      price: req.body.price,
      stock: req.body.stock,
      discount: req.body.discount,
      images: req.body.images,
      discExp: req.body.discExp,
      UserId: req.currentUser.id
    };

    Product.addProduct(newProduct)
      .then(({ ops }) => {
        res.status(201).json({ message: `${ops[0].title} success to created` })
      })
      .catch(err => {
        next(err);
      })
  }

  static findOne(req, res, next) {
    const id = req.params.id;

    Product.getOneProduct(id)
      .then(data => {
        res.status(200).json(data);
      })
      .catch(err => {
        next(err);
      })
  }

  static editProduct(req, res, next) {
    const id = req.params.id;
    const product = {
      title: req.body.title,
      type: req.body.type,
      size: req.body.size,
      color: req.body.color,
      price: req.body.price,
      stock: req.body.stock,
      discount: req.body.discount,
      images: req.body.images,
      discExp: req.body.discExp,
      UserId: req.currentUser.id
    };

    Product.updateProduct(id, product)
      .then(_ => {
        res.status(200).json({ message: `Product with ${id} success to updated` })
      })
      .catch(err => {
        next(err);
      })
  }

  static delete(req, res, next) {
    const id = req.params.id;

    Product.deleteProduct(id)
      .then(_ => {
        res.status(200).json({ message: `Product with ${id} success to deleted` })
      })
      .catch(err => {
        next(err);
      })
  }
}

module.exports = ProductController;