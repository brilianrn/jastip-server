const { getDatabase } = require('../config/index');
const { ObjectId } = require('mongodb');
const checkoutCollection = 'checkout';

class Checkout {
  static addCO(newCO) {
    return getDatabase().collection(checkoutCollection).insertOne(newCO);
  }

  static findOne(coId) {
    return getDatabase().collection(checkoutCollection).find({ _id: ObjectId(coId) }).toArray();
  }
}

module.exports = Checkout;