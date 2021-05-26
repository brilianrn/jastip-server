const { getDatabase } = require('../config');
const { ObjectId } = require('mongodb');
const productCollection = 'products';

class Product {
  static getAllProduct() {
    return getDatabase().collection(productCollection).find().toArray();
  }

  static addProduct(newProduct) {
    return getDatabase().collection(productCollection).insertOne(newProduct);
  }

  static getOneProduct(id) {
    return getDatabase().collection(productCollection).findOne({ _id: ObjectId(id) });
  }

  static updateProduct(id, product) {
    return getDatabase().collection(productCollection).update({ _id: ObjectId(id) }, { $set: product });
  }

  static deleteProduct(id) {
    return getDatabase().collection(productCollection).remove({ _id: ObjectId(id) });
  }

  static findByUserId(userId) {
    return getDatabase().collection(productCollection).find({ UserId: ObjectId(userId) }).toArray();
  }
}

module.exports = Product;