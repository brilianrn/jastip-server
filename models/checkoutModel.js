const { getDatabase } = require('../config/index');
const { ObjectId } = require('mongodb');
const checkoutCollection = 'checkout';
const cartCollection = 'carts';

class Checkout {
  static addCO(newCO) {
    return getDatabase().collection(checkoutCollection).insertOne(newCO);
  }

  static findOne(coId) {
    return getDatabase().collection(checkoutCollection).find({ _id: ObjectId(coId) }).toArray();
  }

  static findOneByProductId(productId) {
    return getDatabase().collection(cartCollection).find({ ProductId: ObjectId(productId) }).toArray();
  }
}

module.exports = Checkout;